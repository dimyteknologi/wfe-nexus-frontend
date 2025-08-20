"use client";

import { useEffect, useMemo, useState } from "react";
import Navigation from "@/components/organisms/Navigation";
import { FileUp } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { useInitializeData } from "@/hooks/useInitDummy";
import Chart from "@/components/chart";
import Table from "@/components/table";
import SimulationForm from "@/components/form/simulation";
import ScenarioMenu from "@/components/organisms/Menu/Scenario";
import { useAppSelector } from "@/stores/root-reducer";
import { validateParameters } from "@/lib/utils/validation";
import {
  extractAverageGrowthRates,
  generateHistoricalProjection,
  generateScenarioProjection,
  processAllGdpData,
} from "@/lib/utils/projections";
import { useAppDispatch } from "@/stores/root-reducer";
import {
  setProjectionResult,
  selectProjectionData,
} from "@/stores/slicers/dssProjectionSlicer";
import { Computation } from "@/lib/utils/formulas";
import { populateInputsWithBaseline } from "@/stores/slicers/dssInputSlicer";
import { IGDPResData } from "@/lib/types/response";

interface ChartSeries {
  name: string;
  data: number[];
}

interface ChartConfig {
  id: string;
  title: string;
  type: "line" | "area" | "bar";
  series: ChartSeries[];
}

interface DerivedMetrics {
  years: string[];
  chartConfigs: ChartConfig[];
}

type iTableData = {
  year: number;
  baseline_1: number;
  baseline_2: number;
};

const dummyData: iTableData[] = Array.from({ length: 42 }).map((_, i) => ({
  year: new Date().getFullYear() - i,
  baseline_1: Math.random() + 1,
  baseline_2: Math.random() + i,
}));

const DSSPage = () => {
  useInitializeData();
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const start = (page - 1) * pageSize;
  const paginatedData = dummyData.slice(start, start + pageSize);
  const simulationState = useAppSelector((state) => state.simulation);
  const historicalGdpData = useAppSelector((state) => state.gdp.data);
  const historicalPopulationData = useAppSelector(
    (state) => state.population.data,
  );
  const projectionData = useAppSelector(selectProjectionData);
  const savedScenarios = useAppSelector((state) => state.scenarios.scenarios);

  const debouncedSimulationState = useDebounce(simulationState, 750);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isScenarioOpen, setIsScenarioOpen] = useState<boolean>(true);

  // form input
  useEffect(() => {
    if (historicalGdpData && !projectionData) {
      const baselineProjection =
        generateHistoricalProjection(historicalGdpData);
      if (baselineProjection) dispatch(setProjectionResult(baselineProjection));

      const processedData = processAllGdpData(historicalGdpData);
      const baselinePayload = extractAverageGrowthRates(processedData);
      if (Object.keys(baselinePayload).length > 0)
        dispatch(populateInputsWithBaseline(baselinePayload));
    }
  }, [historicalGdpData, projectionData, dispatch]);

  useEffect(() => {
    if (!historicalGdpData || !debouncedSimulationState.simulationName) return;
    const scenarioProjection = generateScenarioProjection(
      historicalGdpData,
      debouncedSimulationState,
    );
    if (scenarioProjection) dispatch(setProjectionResult(scenarioProjection));
  }, [debouncedSimulationState, historicalGdpData, dispatch]);

  useEffect(() => {
    const menuErrors: Record<string, string> = {};
    if (!simulationState.simulationName)
      menuErrors.simulationName = "Nama simulasi wajib diisi.";
    if (!simulationState.scenario_a)
      menuErrors.scenario_a = "Skenario A wajib dipilih.";

    const parameterErrors = validateParameters(simulationState);
    setErrors({ ...menuErrors, ...parameterErrors });
  }, [simulationState]);

  const derivedMetrics: DerivedMetrics | null = useMemo(() => {
    if (!projectionData || !historicalPopulationData) return null;

    const allAvailableScenarios = [
      ...(projectionData.tabel.includes("Baseline") ? [projectionData] : []),
      ...savedScenarios,
    ];

    const scenarioA_Data = allAvailableScenarios.find(
      (s) => s.tabel === simulationState.scenario_a,
    );
    const scenarioB_Data = allAvailableScenarios.find(
      (s) => s.tabel === simulationState.scenario_b,
    );

    const calculateMetricsForScenario = (scenario: IGDPResData) => {
      const malePop = historicalPopulationData.parameters["laki"] ?? [];
      const femalePop = historicalPopulationData.parameters["perempuan"] ?? [];
      const totalHistoricalPopulation = Computation.computeArrays(
        "ADD",
        malePop.map((p: number) => p ?? 0),
        femalePop.map((p: number) => p ?? 0),
      );

      const population = Computation.projection({
        data: totalHistoricalPopulation,
        growth: Computation.averageArray(
          Computation.calculateGrowthRates(totalHistoricalPopulation),
        ),
        finalYear: projectionData.tahun[projectionData.tahun.length - 1],
        initialYear: historicalPopulationData.tahun[0],
      });
      const gdrpTotal =
        scenario.parameters["Produk Domestik Regional Bruto"] ?? [];
      const gdrpInBillions = gdrpTotal.map((v) => (v ? v / 1000 : 0));
      const economicGrowth = Computation.calculateGrowthRates(gdrpTotal);
      const gdrpPerCapita = scenario.tahun.map((_, i) => {
        const gdrp = gdrpTotal[i];
        const pop = population[i];
        return gdrp && pop ? gdrp / pop : 0;
      });
      return {
        gdrpInBillions,
        economicGrowth,
        projectedPopulation: population,
        gdrpPerCapita,
      };
    };

    const activeMetrics = calculateMetricsForScenario(projectionData);
    const metricsA = scenarioA_Data
      ? calculateMetricsForScenario(scenarioA_Data)
      : null;
    const metricsB = scenarioB_Data
      ? calculateMetricsForScenario(scenarioB_Data)
      : null;

    const years = projectionData.tahun.map(String);
    const chartConfigs: ChartConfig[] = [
      {
        id: "gdrp",
        title: "GDRP [Bilion Rp/year]",
        type: "bar",
        series: [
          { name: projectionData.tabel, data: activeMetrics.gdrpInBillions },
          ...(metricsA
            ? [
                {
                  name: simulationState.scenario_a,
                  data: metricsA.gdrpInBillions,
                },
              ]
            : []),
          ...(metricsB
            ? [
                {
                  name: simulationState.scenario_b,
                  data: metricsB.gdrpInBillions,
                },
              ]
            : []),
        ],
      },
      {
        id: "economicGrowth",
        title: "Economic Growth [%/year]",
        type: "line",
        series: [
          { name: projectionData.tabel, data: activeMetrics.economicGrowth },
          ...(metricsA
            ? [
                {
                  name: simulationState.scenario_a,
                  data: metricsA.economicGrowth,
                },
              ]
            : []),
          ...(metricsB
            ? [
                {
                  name: simulationState.scenario_b,
                  data: metricsB.economicGrowth,
                },
              ]
            : []),
        ],
      },
      {
        id: "population",
        title: "Population (People)",
        type: "line",
        series: [
          {
            name: projectionData.tabel,
            data: activeMetrics.projectedPopulation,
          },
          ...(metricsA
            ? [
                {
                  name: simulationState.scenario_a,
                  data: metricsA.projectedPopulation,
                },
              ]
            : []),
          ...(metricsB
            ? [
                {
                  name: simulationState.scenario_b,
                  data: metricsB.projectedPopulation,
                },
              ]
            : []),
        ],
      },
      {
        id: "gdrpPerCapita",
        title: "GDRP Per capita [Milion Rp/cap/year]",
        type: "line",
        series: [
          { name: projectionData.tabel, data: activeMetrics.gdrpPerCapita },
          ...(metricsA
            ? [
                {
                  name: simulationState.scenario_a,
                  data: metricsA.gdrpPerCapita,
                },
              ]
            : []),
          ...(metricsB
            ? [
                {
                  name: simulationState.scenario_b,
                  data: metricsB.gdrpPerCapita,
                },
              ]
            : []),
        ],
      },
    ];

    return { years, chartConfigs };
  }, [
    projectionData,
    historicalPopulationData,
    simulationState.scenario_a,
    simulationState.scenario_b,
    savedScenarios,
  ]);

  const handleOpenScenarioTab = () => {
    setIsScenarioOpen((current) => !current);
  };

  return (
    <div className="max-h-[100dvh] w-full overflow-hidden">
      <Navigation />
      {/* dashboard menu */}
      <div className="flex max-h-[5dvh] my-2 sm:my-4 justify-between items-center px-8">
        <div>
          <button
            className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-xs sm:text-sm text-white font-bold ${
              isScenarioOpen ? "bg-green-700" : "bg-green-600"
            }`}
            onClick={handleOpenScenarioTab}
          >
            Scenario Menu
          </button>
        </div>
        <div>
          <button className="cursor-not-allowed" disabled>
            <FileUp className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* dashboard content */}
      <div className="flex  lg:flex-row justify-between h-[80dvh]">
        {/* scenario menu */}
        <div
          className={`${
            isScenarioOpen
              ? "w-full lg:w-1/3 bg-white border border-gray-200"
              : "w-0 border-none -translate-x-full"
          } rounded-lg lg:rounded-2xl py-2 md:py-4 transition-all duration-200 overflow-hidden h-full flex flex-col items-center`}
        >
          <ScenarioMenu
            handleOpenScenarioTab={handleOpenScenarioTab}
            errors={errors}
          />
          <SimulationForm />
        </div>

        {/* chart content */}
        <div
          className={`${isScenarioOpen ? "hidden lg:flex" : "flex"} w-full bg-white min-h-[70vh] lg:min-h-[80dvh] `}
        >
          <div
            className={`w-full h-[70vh] sm:h-[80vh] lg:h-[80dvh] p-2 sm:p-3 md:p-4 overflow-auto lg:overflow-visible ${
              isScenarioOpen
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 grid-flow-row"
            } gap-2 sm:gap-3 md:gap-4 lg:gap-6`}
          >
            {derivedMetrics &&
              derivedMetrics.chartConfigs.map((chartConfig) => (
                <div
                  key={chartConfig.id}
                  className={`w-full h-full min-h-[150px] sm:min-h-[180px] md:min-h-[200px] max-w-full mx-auto bg-white rounded-lg ${
                    isScenarioOpen
                      ? "sm:col-span-1 xl:col-span-3"
                      : "sm:col-span-1  lg:col-span-3"
                  }`}
                >
                  <Chart
                    title={chartConfig.title}
                    content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    type={chartConfig.type}
                    series={chartConfig.series}
                    categories={derivedMetrics.years}
                    height={200}
                    colors={["#1E90FF", "#33A1E0"]}
                  />
                </div>
              ))}

            {!isScenarioOpen && (
              <div className="w-full h-full min-h-[150px] sm:min-h-[180px] md:min-h-[200px] max-w-full mx-auto bg-white rounded-lg sm:col-span-2 lg:col-span-2 lg:row-span-1 lg:row-start-1 lg:row-end-3 lg:col-start-7">
                <Table<iTableData>
                  columns={[
                    { key: "year", label: "Tahun", className: "w-16" },
                    { key: "baseline_1", label: "Baseline 1" },
                    { key: "baseline_2", label: "Baseline 2" },
                  ]}
                  data={paginatedData}
                  page={page}
                  pageSize={pageSize}
                  total={dummyData.length}
                  onPageChange={setPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DSSPage;

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
  generatePopulationProjection,
  generateScenarioProjection,
  processAllGdpData,
} from "@/lib/utils/projections";
import { useAppDispatch } from "@/stores/root-reducer";
import {
  setProjectionResult,
  selectProjectionData,
} from "@/stores/slicers/dssProjectionSlicer";
import { Computation } from "@/lib/utils/formulas";
import {
  populateInputsWithBaseline,
  SimulationState,
} from "@/stores/slicers/dssInputSlicer";
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

export const baselineMetrics = {
  gdrpInBillions: [
    99641.32, 106174.68, 111424.08, 116673.49, 126748.69, 132453.57, 141125.54,
    148358.45, 157317.84, 163946.85, 157710.59, 166941.49, 177470.89, 187051.65,
    196972.85, 207490.83, 218644.43, 230475.43, 243028.81, 256353.06, 270500.47,
    285527.49, 301495.12, 318469.35, 336521.63, 355729.39, 376176.63, 397954.59,
    421162.45, 445908.14, 472309.25, 500494.02, 530602.44, 562787.5, 597216.6,
    634073.05,
  ],
  economicGrowth: [
    6.0, 6.56, 4.94, 4.71, 8.64, 4.5, 6.55, 5.13, 6.04, 4.21, -3.8, 5.85, 6.31,
    5.4, 5.3, 5.34, 5.38, 5.41, 5.45, 5.48, 5.52, 5.56, 5.59, 5.63, 5.67, 5.71,
    5.75, 5.79, 5.83, 5.88, 5.92, 5.97, 6.02, 6.07, 6.12, 6.17,
  ],
  projectedPopulation: [
    2172289, 2199394, 2225383, 2250120, 2273579, 2295778, 2316489, 2336009,
    2353915, 2370488, 2370488, 2370488, 2370488, 2580557, 2615567, 2651053,
    2687020, 2723474, 2760424, 2797875, 2835834, 2874308, 2913303, 2952828,
    2992890, 3033494, 3074650, 3116364, 3158644, 3201497, 3244932, 3288956,
    3333578, 3378804, 3424645, 3471107,
  ],
  gdrpPerCapita: [
    45.87, 48.27, 50.07, 51.85, 55.75, 57.69, 60.92, 63.51, 66.83, 69.16, 66.53,
    70.42, 74.87, 72.48, 75.31, 78.27, 81.37, 84.63, 88.04, 91.62, 95.39, 99.34,
    103.49, 107.85, 112.44, 117.27, 122.35, 127.7, 133.34, 139.28, 145.55,
    152.17, 159.17, 166.56, 174.39, 182.67,
  ],
};

const DSSPage = () => {
  useInitializeData();
  const dispatch = useAppDispatch();

  // pagiantaion
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const start = (page - 1) * pageSize;
  const paginatedData = dummyData.slice(start, start + pageSize);

  const simulationState = useAppSelector((state) => state.simulation);
  const historicalGdpData = useAppSelector((state) => state.gdp.data);
  const historicalPopulationData = useAppSelector(
    (state) => state.population.data,
  );
  const projectionData = useAppSelector(selectProjectionData); // Skenario aktif/terbaru
  const savedScenarios = useAppSelector((state) => state.scenarios.scenarios);
  const debouncedSimulationState = useDebounce(simulationState, 750);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isScenarioOpen, setIsScenarioOpen] = useState<boolean>(true);

  // Efek untuk kalkulasi baseline awal dan mengisi form
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

  // Efek untuk kalkulasi ulang proyeksi dinamis berdasarkan input
  useEffect(() => {
    if (!historicalGdpData || !debouncedSimulationState.simulationName) return;
    const scenarioProjection = generateScenarioProjection(
      historicalGdpData,
      debouncedSimulationState,
    );
    if (scenarioProjection) dispatch(setProjectionResult(scenarioProjection));
  }, [debouncedSimulationState, historicalGdpData, dispatch]);

  // Efek untuk validasi (dengan perbaikan bug)
  useEffect(() => {
    const menuErrors: Record<string, string> = {};
    if (!simulationState.simulationName)
      menuErrors.simulationName = "Nama simulasi wajib diisi.";

    const parameterErrors = validateParameters(simulationState);
    setErrors({ ...menuErrors, ...parameterErrors });
  }, [simulationState]);

  const derivedMetrics: DerivedMetrics | null = useMemo(() => {
    if (!projectionData || !historicalGdpData || !historicalPopulationData) {
      return null;
    }

    const baselineForMenu = {
      ...generateHistoricalProjection(historicalGdpData),
      simulationName: "Baseline (Historical Projection)",
    };
    const allAvailableScenarios = [baselineForMenu, ...savedScenarios];

    // const scenarioA_Data = allAvailableScenarios.find(
    //   (s) => s.simulationName === simulationState.scenario_a,
    // );
    // const scenarioB_Data = allAvailableScenarios.find(
    //   (s) => s.simulationName === simulationState.scenario_b,
    // );

    const baselineName = "Baseline (Historical Projection)";
    const scenarioA_Recipe = allAvailableScenarios.find(
      (s: SimulationState) => s.simulationName === simulationState.scenario_a,
    );
    const scenarioB_Recipe = allAvailableScenarios.find(
      (s: SimulationState) => s.simulationName === simulationState.scenario_b,
    );

    let scenarioA_ProjectionData: IGDPResData | null = null;
    if (simulationState.scenario_a) {
      if (simulationState.scenario_a === baselineName) {
        // Jika yang dipilih adalah baseline, ia sudah "matang"
        scenarioA_ProjectionData =
          generateHistoricalProjection(historicalGdpData);
      } else if (scenarioA_Recipe) {
        // Jika resep ditemukan, "masak" sekarang
        scenarioA_ProjectionData = generateScenarioProjection(
          historicalGdpData,
          scenarioA_Recipe,
        );
      }
    }

    // Ulangi proses yang sama untuk Skenario B
    let scenarioB_ProjectionData: IGDPResData | null = null;
    if (simulationState.scenario_b) {
      if (simulationState.scenario_b === baselineName) {
        scenarioB_ProjectionData =
          generateHistoricalProjection(historicalGdpData);
      } else if (scenarioB_Recipe) {
        scenarioB_ProjectionData = generateScenarioProjection(
          historicalGdpData,
          scenarioB_Recipe,
        );
      }
    }

    const getMetricsFromProjection = (
      scenario: IGDPResData,
      simState: SimulationState,
    ) => {
      const population = generatePopulationProjection(
        historicalPopulationData,
        simState,
      );
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
    const activeMetrics = getMetricsFromProjection(
      projectionData,
      simulationState,
    );
    const metricsA = scenarioA_ProjectionData
      ? getMetricsFromProjection(
          scenarioA_ProjectionData,
          scenarioA_Recipe || baselineMetrics,
        )
      : null;
    const metricsB = scenarioB_ProjectionData
      ? getMetricsFromProjection(
          scenarioB_ProjectionData,
          scenarioB_Recipe || baselineMetrics,
        )
      : null;

    const years = projectionData.tahun.map(String);
    const chartConfigs: ChartConfig[] = [
      {
        id: "gdrp",
        title: "GDRP [Bilion Rp/year]",
        type: "bar",
        series: [
          { name: projectionData.tabel, data: baselineMetrics.gdrpInBillions },
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
        title: "Economic Growth (%/year)",
        type: "line",
        series: [
          { name: projectionData.tabel, data: baselineMetrics.economicGrowth },
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
            data: baselineMetrics.projectedPopulation,
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
        type: "bar",
        series: [
          { name: projectionData.tabel, data: baselineMetrics.gdrpPerCapita },
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
    simulationState,
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

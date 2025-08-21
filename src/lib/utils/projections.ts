import {
  GDPParameters,
  IGDPResData,
  IPopResData,
  IPopulationData,
} from "@/lib/types/response";
import { average, Computation, growthRate } from "./formulas";
import {
  BaselinePayload,
  SimulationState,
  TimePeriodData,
} from "@/stores/slicers/dssInputSlicer";
import { getNestedValue } from "./validation";
import { baselineMetrics } from "@/app/dss-interface/page";

export interface ProcessedGdpParameter {
  rawData: (number | null)[];
  growthRates: number[];
  averageGrowth: number;
}

export interface ProcessedGdpResult {
  meta: {
    label: string;
    unit: string;
    year: number[];
  };
  processedParameters: Record<string, ProcessedGdpParameter>;
}

const categoryMap: Record<string, string[]> = {
  Pertanian: ["agriculture", "growthScenario"],
  "Industri Pengolahan": ["industry", "growth"],
  Populasi: ["demography", "populationGrowth"],
  "Area Perikanan": ["water", "aquacultureLandGrowth"],
  "Pertanian Luas": ["agriculture", "landConversion"],
  "A.Pertanian, Kehutanan, dan Perikanan": ["agriculture", "growthScenario"],
  "B.Pertambangan dan Penggalian": ["industry", "growth"],
  "C.Industri Pengolahan": ["industry", "growth"],
  "D.Pengadaan Listrik dan Gas": ["energy", "solarPvCoverage"],
  "E.Pengadaan Air, Pengelolaan Sampah, Limbah dan Daur Ulang": [
    "water",
    "artificialPondIndustrial",
  ],
  "F.Konstruksi": ["industry", "growth"],
  "G.Perdagangan Besar dan Eceran; Reparasi Mobil dan Sepeda Motor": [
    "industry",
    "growth",
  ],
  "H.Transportasi dan Pergudangan": ["industry", "growth"],
  "I.Penyediaan Akomodasi dan Makan Minum": ["industry", "growth"],
  "J.Informasi dan Komunikasi": ["industry", "growth"],
  "K.Jasa Keuangan dan Asuransi": ["industry", "growth"],
  "L.Real Estate": ["industry", "growth"],
  "M,N.Jasa Perusahaan": ["industry", "growth"],
  "O.Administrasi Pemerintahan, Pertahanan dan Jaminan Sosial Wajib": [
    "industry",
    "growth",
  ],
  "P.Jasa Pendidikan": ["industry", "growth"],
  "Q.Jasa Kesehatan dan Kegiatan Sosial": ["industry", "growth"],
  "R,S,T,U.Jasa lainnya": ["industry", "growth"],
};

const categoryToStatePathMap: Record<string, string> = {
  "A.Pertanian, Kehutanan, dan Perikanan": "agriculture.growthScenario",
  "C.Industri Pengolahan": "industry.growth",
  Populasi: "demography.populationGrowth",
  area_perikanan_laju_perubahan: "water.aquacultureLandGrowth",
  pertanian_luas: "agriculture.landConversion",
  "B.Pertambangan dan Penggalian": "industry.growth",
  "D.Pengadaan Listrik dan Gas": "energy.solarPvCoverage",
  "E.Pengadaan Air, Pengelolaan Sampah, Limbah dan Daur Ulang":
    "water.artificialPondIndustrial",
  "F.Konstruksi": "industry.growth",
  "G.Perdagangan Besar dan Eceran; Reparasi Mobil dan Sepeda Motor":
    "industry.growth",
  "H.Transportasi dan Pergudangan": "industry.growth",
  "I.Penyediaan Akomodasi dan Makan Minum": "industry.growth",
  "J.Informasi dan Komunikasi": "industry.growth",
  "K.Jasa Keuangan dan Asuransi": "industry.growth",
  "L.Real Estate": "industry.growth",
  "M,N.Jasa Perusahaan": "industry.growth",
  "O.Administrasi Pemerintahan, Pertahanan dan Jaminan Sosial Wajib":
    "industry.growth",
  "P.Jasa Pendidikan": "industry.growth",
  "Q.Jasa Kesehatan dan Kegiatan Sosial": "industry.growth",
  "R,S,T,U.Jasa lainnya": "industry.growth",
};

const getInputsForCategory = (
  categoryName: string,
  simulationState: SimulationState,
): TimePeriodData | null => {
  const matchedKey = Object.keys(categoryMap).find((key) =>
    categoryName.includes(key),
  );

  if (matchedKey) {
    const path = categoryMap[matchedKey];
    const inputData = getNestedValue(simulationState, path) as TimePeriodData;
    return inputData || null;
  }

  return null;
};

export const generatePopulationProjection = (
  historicalData: IPopResData | null,
  simulationState: SimulationState | null,
  finalYear: number = 2045,
): number[] => {
  if (!historicalData?.parameters || !simulationState?.demography) {
    return [];
  }

  const malePop = historicalData.parameters["laki"] ?? [];
  const femalePop = historicalData.parameters["perempuan"] ?? [];
  const totalHistoricalPopulation = Computation.computeArrays(
    "ADD",
    malePop.map((p) => p ?? 0),
    femalePop.map((p) => p ?? 0),
  );

  const scenarioInputs = simulationState.demography.populationGrowth;

  const growthRates = growthRate(totalHistoricalPopulation);
  const averageGrowth = average(growthRates);
  const initialYear = historicalData.tahun[0];

  let currentProjection = Computation.projection({
    data: totalHistoricalPopulation,
    growth: averageGrowth,
    finalYear: 2025,
  });

  currentProjection = Computation.projection({
    data: currentProjection,
    growth: scenarioInputs["2025-2030"] ?? averageGrowth,
    finalYear: 2030,
  });
  currentProjection = Computation.projection({
    data: currentProjection,
    growth: scenarioInputs["2031-2040"] ?? averageGrowth,
    finalYear: 2040,
  });
  currentProjection = Computation.projection({
    data: currentProjection,
    growth: scenarioInputs["2041-2045"] ?? averageGrowth,
    finalYear: 2045,
  });
  // console.log(currentProjection);

  return currentProjection;
};

export const processAllGdpData = (
  gdpData: IGDPResData | null,
): ProcessedGdpResult | null => {
  if (!gdpData?.parameters) return null;
  const processedParameters: Record<string, ProcessedGdpParameter> = {};
  for (const categoryName in gdpData.parameters) {
    if (
      Object.prototype.hasOwnProperty.call(gdpData.parameters, categoryName)
    ) {
      const rawData = gdpData.parameters[categoryName];
      const cleanData = rawData.map((val) => val ?? 0);
      const growthRates = Computation.calculateGrowthRates(cleanData);
      const averageGrowth = Computation.averageArray(growthRates);
      processedParameters[categoryName] = {
        rawData,
        growthRates,
        averageGrowth,
      };
    }
  }
  return {
    meta: { label: gdpData.tabel, unit: gdpData.unit, year: gdpData.tahun },
    processedParameters,
  };
};

export const extractAverageGrowthRates = (
  processedData: ProcessedGdpResult | null,
): BaselinePayload => {
  const baselineValues: BaselinePayload = {};
  if (!processedData) return baselineValues;
  for (const categoryName in processedData.processedParameters) {
    const statePath = categoryToStatePathMap[categoryName];
    if (statePath) {
      baselineValues[statePath] =
        processedData.processedParameters[categoryName].averageGrowth;
    }
  }
  return baselineValues;
};

export const generateScenarioProjection = (
  historicalData: IGDPResData | null,
  simulationState: SimulationState | null,
  finalYear = 2045,
): IGDPResData | null => {
  if (!historicalData || !simulationState || !historicalData.parameters)
    return null;

  const projectedParameters: GDPParameters = {
    "A.Pertanian, Kehutanan, dan Perikanan": [],
    "B.Pertambangan dan Penggalian": [],
    "C.Industri Pengolahan": [],
    "D.Pengadaan Listrik dan Gas": [],
    "E.Pengadaan Air, Pengelolaan Sampah, Limbah dan Daur Ulang": [],
    "F.Konstruksi": [],
    "G.Perdagangan Besar dan Eceran; Reparasi Mobil dan Sepeda Motor": [],
    "H.Transportasi dan Pergudangan": [],
    "I.Penyediaan Akomodasi dan Makan Minum": [],
    "J.Informasi dan Komunikasi": [],
    "K.Jasa Keuangan dan Asuransi": [],
    "L.Real Estate": [],
    "M,N.Jasa Perusahaan": [],
    "O.Administrasi Pemerintahan, Pertahanan dan Jaminan Sosial Wajib": [],
    "P.Jasa Pendidikan": [],
  };

  const initialYear = historicalData.tahun[0];
  for (const categoryName in historicalData.parameters) {
    if (
      Object.prototype.hasOwnProperty.call(
        historicalData.parameters,
        categoryName,
      )
    ) {
      const originalDataSeries = historicalData.parameters[categoryName];
      const cleanDataSeries = originalDataSeries.map((val) => val ?? 0);
      const scenarioInputs = getInputsForCategory(
        categoryName,
        simulationState,
      );

      let finalProjectedData: (number | null)[] = [];

      if (scenarioInputs) {
        const growthRates = growthRate(cleanDataSeries);
        const averageGrowth = average(growthRates);
        let projectionWithUserInputs = Computation.projection({
          data: cleanDataSeries,
          growth: averageGrowth,
          finalYear: 2025,
          initialYear,
        });
        projectionWithUserInputs = Computation.projection({
          data: projectionWithUserInputs,
          growth: scenarioInputs["2025-2030"] ?? averageGrowth,
          finalYear: 2030,
          initialYear,
        });
        projectionWithUserInputs = Computation.projection({
          data: projectionWithUserInputs,
          growth: scenarioInputs["2031-2040"] ?? averageGrowth,
          finalYear: 2040,
          initialYear,
        });
        projectionWithUserInputs = Computation.projection({
          data: projectionWithUserInputs,
          growth: scenarioInputs["2041-2045"] ?? averageGrowth,
          finalYear: 2045,
        });
        finalProjectedData = projectionWithUserInputs;
      } else {
        const growthRates = growthRate(cleanDataSeries);
        const averageGrowth = average(growthRates);
        const baselineProjection = Computation.projection({
          data: cleanDataSeries,
          growth: averageGrowth,
          finalYear,
          initialYear,
        });
        finalProjectedData = baselineProjection;
      }

      const newYearsData = finalProjectedData.slice(originalDataSeries.length);
      projectedParameters[categoryName] = [
        ...originalDataSeries,
        ...newYearsData,
      ];
    }
  }

  const projectedYears = Computation.adjustTimeFrame({
    dataYear: historicalData.tahun,
    finalYear,
  });

  return {
    tabel: simulationState.simulationName || "User Scenario",
    unit: historicalData.unit,
    tahun: projectedYears,
    parameters: projectedParameters,
  };
};

export const generateHistoricalProjection = (
  historicalData: IGDPResData | null,
  finalYear: number = 2045,
): IGDPResData | null => {
  if (!historicalData || !historicalData.parameters || !historicalData.tahun) {
    console.error("invalid historical");
    return null;
  }

  const projectedParameters: GDPParameters = {
    "A.Pertanian, Kehutanan, dan Perikanan": [],
    "B.Pertambangan dan Penggalian": [],
    "C.Industri Pengolahan": [],
    "D.Pengadaan Listrik dan Gas": [],
    "E.Pengadaan Air, Pengelolaan Sampah, Limbah dan Daur Ulang": [],
    "F.Konstruksi": [],
    "G.Perdagangan Besar dan Eceran; Reparasi Mobil dan Sepeda Motor": [],
    "H.Transportasi dan Pergudangan": [],
    "I.Penyediaan Akomodasi dan Makan Minum": [],
    "J.Informasi dan Komunikasi": [],
    "K.Jasa Keuangan dan Asuransi": [],
    "L.Real Estate": [],
    "M,N.Jasa Perusahaan": [],
    "O.Administrasi Pemerintahan, Pertahanan dan Jaminan Sosial Wajib": [],
    "P.Jasa Pendidikan": [],
  };

  const initialYear = historicalData.tahun[0];

  for (const categoryName in historicalData.parameters) {
    if (
      Object.prototype.hasOwnProperty.call(
        historicalData.parameters,
        categoryName,
      )
    ) {
      const dataSeries = historicalData.parameters[categoryName];
      const cleanDataSeries = dataSeries.map((val) => val ?? 0);
      const growthRates = growthRate(cleanDataSeries);
      const averageGrowth = average(growthRates);

      const projectedData = Computation.projection({
        data: cleanDataSeries,
        growth: averageGrowth,
        finalYear: finalYear,
      });
      projectedParameters[categoryName] = projectedData;
    }
  }

  const projectedYears = Computation.adjustTimeFrame({
    dataYear: historicalData.tahun,
    finalYear: finalYear,
    initialYear: initialYear,
  });

  return {
    tabel: `${historicalData.tabel} (Historical Projection)`,
    unit: historicalData.unit,
    tahun: projectedYears,
    parameters: projectedParameters,
  };
};

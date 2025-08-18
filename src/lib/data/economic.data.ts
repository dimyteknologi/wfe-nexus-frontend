import fetchDashboardData from "../api/fetchDashboardData";
import { average, dataProjection } from "../utils/formulas";
import { selectData, TYPE_DATA_SELECT } from "../utils/selectData";

export interface GdpData {
  data: {
    table: string;
    unit: string;
    year: number[];
    parameters: Record<string, number[]>;
  };
}

export interface ProcessedGdpData {
  gdpCategoryA: number[];
  averageGdpCategoryA: number;
  meta: {
    label: string;
    unit: string;
    year: number[];
  };
}

export async function processGdpData(): Promise<ProcessedGdpData> {
  try {
    const { gdpData } = await fetchDashboardData();

    if (!gdpData?.data) {
      throw new Error("GDP data structure is invalid");
    }

    const getGdpLabel = selectData(
      gdpData.data,
      TYPE_DATA_SELECT.SELECT_TABLE,
    ) as string;
    const getGdpUnit = selectData(
      gdpData.data,
      TYPE_DATA_SELECT.SELECT_UNIT,
    ) as string;
    const getGdpYear = selectData(
      gdpData.data,
      TYPE_DATA_SELECT.SELECT_YEAR,
    ) as number[];
    const getGdpData = selectData(
      gdpData.data,
      TYPE_DATA_SELECT.SELECT_PARAMETERS,
    ) as Record<string, number[]>;

    const gdpCategoryA =
      getGdpData["A.Pertanian, Kehutanan, dan Perikanan"] || [];

    return {
      gdpCategoryA,
      averageGdpCategoryA: average(gdpCategoryA),
      meta: {
        label: getGdpLabel,
        unit: getGdpUnit,
        year: getGdpYear,
      },
    };
  } catch (error) {
    console.error("Error processing GDP data:", error);
    throw new Error(
      `GDP data processing failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

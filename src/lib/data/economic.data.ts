import fetchDashboardData from "../api/fetchDashboardData";
import { average, dataProjection, growthRate } from "../utils/formulas";
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
  meta: {
    label: string;
    unit: string;
    year: number[];
  };
  average: {
    growth_average_gdp_category_a: number;
  };
  baseline: {
    gdp_kategori_a: number[];
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

    const growtGdpCategoryA = growthRate(gdpCategoryA);

    const averageGdpCategoryA = average(growtGdpCategoryA);

    const proyeksi_gdp_kategori_a_baseline = dataProjection(
      gdpCategoryA,
      averageGdpCategoryA,
      2045,
    );

    return {
      average: {
        growth_average_gdp_category_a: averageGdpCategoryA,
      },
      meta: {
        label: getGdpLabel,
        unit: getGdpUnit,
        year: getGdpYear,
      },
      baseline: {
        gdp_kategori_a: proyeksi_gdp_kategori_a_baseline,
      },
    };
  } catch (error) {
    console.error("Error processing GDP data:", error);
    throw new Error(
      `GDP data processing failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

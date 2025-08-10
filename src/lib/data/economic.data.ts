import fetchDashboardData from "../api/fetchAllData";
import {
  adjustTimeFrame,
  computationArrays,
  growthArrayCalculation,
  projectionHistoricalData,
  TYPE_COMPUTATION_ARRAY,
} from "../utils/formulas";
import { selectData, TYPE_DATA_SELECT } from "../utils/selectData";

const { gdpData } = await fetchDashboardData();

const getGdpLabel = selectData(gdpData.data, TYPE_DATA_SELECT.SELECT_TABLE);

const getGdpUnit = selectData(gdpData.data, TYPE_DATA_SELECT.SELECT_UNIT);

const getGdpYear = selectData(gdpData.data, TYPE_DATA_SELECT.SELECT_YEAR);

const getGdpData = selectData(gdpData.data, TYPE_DATA_SELECT.SELECT_PARAMETERS);

const timeFrame = adjustTimeFrame({
  dataYear: getGdpYear,
  finalYear: 2030,
});

const projectionGdpPertanian = projectionHistoricalData({
  data: getGdpData["A.Pertanian, Kehutanan, dan Perikanan"],
  growth: 10,
  finalYear: 2030,
});

console.log(getGdpData["B.Pertambangan dan Penggalian"]);

const projectionGdpIndustri = projectionHistoricalData({
  data: getGdpData["C.Industri Pengolahan"],
  growth: 10,
  finalYear: 2030,
});

const totalGDP = computationArrays(
  TYPE_COMPUTATION_ARRAY.ADD,
  projectionGdpPertanian,
);

const gdpPertanianGrowth = growthArrayCalculation(projectionGdpPertanian);
const gdpIndustriGrowth = growthArrayCalculation(projectionGdpIndustri);

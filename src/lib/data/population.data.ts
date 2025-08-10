import fetchDashboardData from "../api/fetchAllData";
import {
  adjustTimeFrame,
  projectionHistoricalData,
  computationArrays,
  TYPE_COMPUTATION_ARRAY,
} from "../utils/formulas";
import { selectData, TYPE_DATA_SELECT } from "../utils/selectData";

const { populationData } = await fetchDashboardData();

const getPopLabel = selectData(
  populationData.data,
  TYPE_DATA_SELECT.SELECT_TABLE,
);

const getPopUnit = selectData(
  populationData.data,
  TYPE_DATA_SELECT.SELECT_UNIT,
);

const getPopYear = selectData(
  populationData.data,
  TYPE_DATA_SELECT.SELECT_YEAR,
);

const getPopMenData = selectData(
  populationData.data,
  TYPE_DATA_SELECT.SELECT_PARAMETERS,
);

const timeFrame = adjustTimeFrame({
  dataYear: getPopYear,
  finalYear: 2030,
});

const projectionPopMen = projectionHistoricalData({
  data: getPopMenData.laki,
  growth: 10,
  finalYear: 2030,
});

const projectionPopWomen = projectionHistoricalData({
  data: getPopMenData.perempuan,
  growth: 10,
  finalYear: 2030,
});

const totalPop = computationArrays(
  TYPE_COMPUTATION_ARRAY.ADD,
  projectionPopMen,
  projectionPopWomen,
);

interface IPopulationFinal {
  name: string;
  unit: string;
  year: number[];
  data: {
    totalPopulation: number[];
  };
}

export const populationDataFinal: IPopulationFinal = {
  name: getPopLabel,
  unit: getPopUnit,
  year: timeFrame,
  data: {
    totalPopulation: totalPop,
  },
};

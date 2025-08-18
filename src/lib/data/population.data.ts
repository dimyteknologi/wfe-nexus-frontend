import fetchDashboardData from "../api/fetchDashboardData";
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

interface IPopulationFinal {
  name: string;
  unit: string;
  year: number[];
  data: {
    totalPopulation: number[];
    populationMenGrowth: number[];
    populationWomanGrowth: number[];
  };
}

// export const populationDataFinal: IPopulationFinal = {
//   name: getPopLabel,
//   unit: getPopUnit,
//   year: timeFrame,
//   data: {
//     totalPopulation: totalPop,
//     populationMenGrowth: populationMenGrowth,
//     populationWomanGrowth: populationWomanGrowth,
//   },
// };

import fetchDashboardData from "@/lib/api/fetchAllData";
import {
  adjustTimeFrame,
  computationArrays,
  projectionHistoricalData,
} from "@/lib/utils/formulas";
import { selectData, TYPE_DATA_SELECT } from "@/lib/utils/selectData";
import { TYPE_COMPUTATION_ARRAY } from "../../lib/utils/formulas";

export default async function DSSPage() {
  const { populationData } = await fetchDashboardData();

  const getPopLable = selectData(
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

  return (
    <div className="container mx-auto p-4">
      <div>
        <p>Tabel: {getPopLable} </p>
        <p>Units: {getPopUnit}</p>
      </div>
      <div className="flex gap-8">
        <div>
          <p>Year</p>
          <ul>
            {timeFrame.map((time, idx) => (
              <li key={idx}>{time}</li>
            ))}
          </ul>
        </div>
        <div>
          <p>Men Population</p>
          <ul>
            {projectionPopMen.map((data, idx) => (
              <li key={idx}>{data}</li>
            ))}
          </ul>
        </div>
        <div>
          <p>Women Population</p>
          <ul>
            {projectionPopWomen.map((data, idx) => (
              <li key={idx}>{data}</li>
            ))}
          </ul>
        </div>
        <div>
          <p>Total Population</p>
          <ul>
            {totalPop.map((data: number, idx: number) => (
              <li key={idx}>{data}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

interface IFormulaProps {
  param1: number;
  param2: number;
}

interface IGrowthCalProps {
  before: number;
  current: number;
}

interface IProjectionCalProps {
  before: number;
  growth: number;
}

export const addCalculation = ({ param1, param2 }: IFormulaProps) => {
  return param1 + param2;
};

export const multiplyCalculation = ({ param1, param2 }: IFormulaProps) => {
  return param1 * param2;
};

export const growthCalculation = ({ before, current }: IGrowthCalProps) => {
  return (current / before - 1) * 100;
};

export const projectionCalculation = ({
  before,
  growth,
}: IProjectionCalProps) => {
  return Math.round(before * (1 + growth / 100) * 100) / 100;
};

interface IProjectionHistorical {
  data: number[];
  growth: number;
  finalYear: number;
  initialYear?: number;
}

export const projectionHistoricalData = ({
  data,
  growth,
  finalYear,
  initialYear = 2010,
}: IProjectionHistorical) => {
  const arrayHasil: number[] = [...data];

  let time = initialYear + arrayHasil.length;

  while (time <= finalYear) {
    const lastValue = arrayHasil[arrayHasil.length - 1];

    const nextValue = projectionCalculation({
      before: lastValue,
      growth: growth,
    });

    console.log(time, nextValue);
    arrayHasil.push(nextValue);
    time += 1;
  }

  return arrayHasil;
};

interface IAdjustTimeFrame {
  initialYear?: number;
  finalYear: number;
  dataYear: number[];
}

export const adjustTimeFrame = ({
  dataYear,
  finalYear,
  initialYear = 2010,
}: IAdjustTimeFrame) => {
  const arrayHasil: number[] = [...dataYear];

  while (arrayHasil.length <= finalYear - initialYear) {
    const lastValue = arrayHasil[arrayHasil.length - 1];
    const nextValue = lastValue + 1;
    arrayHasil.push(nextValue);
  }
  return arrayHasil;
};

export const sumArrays = (...arrays: number[][]) => {
  if (arrays.length === 0) return [];

  const length = arrays[0].length;
  if (!arrays.every((arr) => arr.length === length)) {
    throw new Error("Semua array harus memiliki panjang yang sama");
  }

  const result: number[] = [];
  for (let i = 0; i < length; i++) {
    result.push(
      Math.round(arrays.reduce((sum, arr) => sum + arr[i], 0) * 100) / 100,
    );
  }

  return result;
};

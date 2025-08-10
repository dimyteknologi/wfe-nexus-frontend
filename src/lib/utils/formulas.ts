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

export const TYPE_COMPUTATION_ARRAY = {
  ADD: "ADD",
  MULTIPLY: "MULTIPLY",
} as const;

type ComputationType = keyof typeof TYPE_COMPUTATION_ARRAY;

export const computationArrays = (
  type: ComputationType,
  ...arrays: number[][]
): number[] => {
  if (arrays.length === 0) return [];

  const length = arrays[0].length;
  if (!arrays.every((arr) => arr.length === length)) {
    throw new Error("All arrays must have the same length");
  }

  const result: number[] = new Array(length).fill(
    type === TYPE_COMPUTATION_ARRAY.MULTIPLY ? 1 : 0,
  );

  for (const arr of arrays) {
    for (let i = 0; i < length; i++) {
      switch (type) {
        case TYPE_COMPUTATION_ARRAY.ADD:
          result[i] += arr[i];
          break;
        case TYPE_COMPUTATION_ARRAY.MULTIPLY:
          result[i] *= arr[i];
          break;
        default:
          throw new Error("Invalid computation type");
      }
    }
  }

  return result.map((num) => Math.round(num * 100) / 100);
};

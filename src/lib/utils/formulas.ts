interface IGrowthCalProps {
  before: number;
  current: number;
}

interface IProjectionCalProps {
  before: number;
  growth: number;
}

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
  const result: number[] = [...data];

  let time = initialYear + result.length;

  while (time <= finalYear) {
    const lastValue = result[result.length - 1];

    const nextValue = projectionCalculation({
      before: lastValue,
      growth: growth,
    });

    console.log(time, nextValue);
    result.push(nextValue);
    time += 1;
  }

  return result;
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
  const result: number[] = [...dataYear];

  while (result.length <= finalYear - initialYear) {
    const lastValue = result[result.length - 1];
    const nextValue = lastValue + 1;
    result.push(nextValue);
  }
  return result;
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

export const growthCalculation = ({ before, current }: IGrowthCalProps) => {
  if (!before || !current) return 0;
  if (before && current) {
    return current / before - 1;
  }
  return 0;
};

export const growthArrayCalculation = (array: number[] | null[]) => {
  const result: number[] = [0];
  const newArray = array.map((item) => (item === null ? 0 : item));
  for (let i = 1; i < newArray.length; i++) {
    const growth_i = growthCalculation({
      before: newArray[i - 1],
      current: newArray[i],
    });
    result.push(growth_i);
  }
  return result;
};

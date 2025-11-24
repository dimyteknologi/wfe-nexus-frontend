export class Computation {
  public static readonly ARRAY_OPERATION_TYPES = {
    ADD: "ADD",
    MULTIPLY: "MULTIPLY",
    DIVIDED: "DIVIDED",
  } as const;

  private constructor() {}

  private static calculateProjection({
    before,
    growth,
  }: {
    before: number;
    growth: number;
  }): number {
    return parseFloat((before * (1 + growth / 100)).toFixed(2));
  }

  public static projection({
    data,
    growth,
    finalYear,
    initialYear = 2010,
  }: {
    data: number[];
    growth: number;
    finalYear: number;
    initialYear?: number;
  }): number[] {
    const result: number[] = [...data];
    let time = initialYear + result.length;

    while (time <= finalYear) {
      const lastValue = result[result.length - 1];
      const nextValue = this.calculateProjection({ before: lastValue, growth });
      result.push(nextValue);
      time += 1;
    }

    return result;
  }

  public static adjustTimeFrame({
    dataYear,
    finalYear = 2045,
    initialYear = 2010,
  }: {
    dataYear: number[];
    finalYear: number;
    initialYear?: number;
  }): number[] {
    const result: number[] = [...dataYear];

    while (result.length <= finalYear - initialYear) {
      const lastValue = result[result.length - 1];
      const nextValue = lastValue + 1;
      result.push(nextValue);
    }
    return result;
  }

  public static computeArrays(
    type: keyof typeof Computation.ARRAY_OPERATION_TYPES,
    ...arrays: number[][]
  ): number[] {
    if (arrays.length === 0) return [];

    const length = arrays[0].length;
    if (!arrays.every((arr) => arr.length === length)) {
      throw new Error("All arrays must have the same length");
    }

    const result: number[] = new Array(length).fill(
      type === Computation.ARRAY_OPERATION_TYPES.MULTIPLY ? 1 : 0,
    );

    for (const arr of arrays) {
      for (let i = 0; i < length; i++) {
        switch (type) {
          case Computation.ARRAY_OPERATION_TYPES.ADD:
            result[i] += arr[i];
            break;
          case Computation.ARRAY_OPERATION_TYPES.MULTIPLY:
            result[i] *= arr[i];
            break;
          case Computation.ARRAY_OPERATION_TYPES.DIVIDED:
            result[i] /= arr[i];
          default:
            throw new Error("Invalid computation type");
        }
      }
    }

    return result.map((num) => parseFloat(((num * 100) / 100).toFixed(2)));
  }

  private static calculateGrowthRate({
    before,
    current,
  }: {
    before: number;
    current: number;
  }): number {
    if (!before || !current) return 0;
    return parseFloat(((current / before - 1) * 100).toFixed(2));
  }

  public static calculateGrowthRates(array: (number | null)[]): number[] {
    const result: number[] = [0];
    const newArray = array.map((item) => (item === null ? 0 : item));

    for (let i = 1; i < newArray.length; i++) {
      const growth_i = this.calculateGrowthRate({
        before: newArray[i - 1],
        current: newArray[i],
      });
      result.push(growth_i);
    }

    return result;
  }

  public static averageArray = (array: number[]) => {
    const strResult = array.reduce((a, b) => a + b, 0) / array.length;
    return parseFloat(strResult.toFixed(2));
  };

  public static growthArrayByValue = (
    dataInitial: number,
    dataGrowth: number[],
  ) => {
    const result = [dataInitial];

    for (let i = 1; i < dataGrowth.length; i++) {
      const data = (1 + dataGrowth[i]) * result[i - 1];
      result.push(data);
    }

    return result;
  };
}

export type GrowthCalculationProps = {
  before: number;
  current: number;
};

export type ProjectionCalculationProps = {
  before: number;
  growth: number;
};

export type HistoricalProjectionProps = {
  data: number[];
  growth: number;
  finalYear: number;
  initialYear?: number;
};

export type TimeFrameAdjustmentProps = {
  dataYear: number[];
  finalYear: number;
  initialYear?: number;
};

export const extendTimeFrame = (data: number[], maxYear: number) =>
  Computation.adjustTimeFrame({
    dataYear: data,
    finalYear: maxYear,
  });

export const dataProjection = (
  data: number[],
  growth: number,
  finalYear: number,
) =>
  Computation.projection({
    data: data,
    growth: growth,
    finalYear: finalYear,
  });

export const sumData = (...arrays: number[][]) =>
  Computation.computeArrays(Computation.ARRAY_OPERATION_TYPES.ADD, ...arrays);

export const growthRate = (data: number[]) => {
  return Computation.calculateGrowthRates(data);
};

export const average = (data: number[]) => {
  if (data[0] === 0) {
    return Computation.averageArray(data.slice(1));
  }
  return Computation.averageArray(data);
};

export const growthDataByvalue = (data: number, growthArr: number[]) => {
  return Computation.growthArrayByValue(data, growthArr);
};

export const constantMultiply = (data: number[], constant: number) => {
  return data.map((d) => d * constant);
};

export const constantDevided = (data: number[], constant: number) => {
  return data.map((d) => d / constant);
};

export const constantAdd = (data: number[], constant: number) => {
  return data.map((d) => d + constant);
};

export const resultConverter = (data: number[]) => {
  return data.map((d) => parseFloat(d.toFixed(2)));
};

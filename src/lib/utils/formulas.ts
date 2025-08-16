export class Computation {
  private static readonly ARRAY_OPERATION_TYPES = {
    ADD: "ADD",
    MULTIPLY: "MULTIPLY",
  } as const;

  private constructor() {}

  private static calculateProjection({
    before,
    growth,
  }: {
    before: number;
    growth: number;
  }): number {
    return Math.round(before * (1 + growth / 100) * 100) / 100;
  }

  public static calculateHistoricalProjection({
    data,
    growth,
    finalYear,
    initialYear,
  }: {
    data: number[];
    growth: number;
    finalYear: number;
    initialYear: number;
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
          default:
            throw new Error("Invalid computation type");
        }
      }
    }

    return result.map((num) => Math.round(num * 100) / 100);
  }

  public static calculateGrowthRate({
    before,
    current,
  }: {
    before: number;
    current: number;
  }): number {
    if (!before || !current) return 0;
    return current / before - 1;
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
}

// Type exports for external use
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

// export type ArrayOperationType = keyof typeof Computation.ARRAY_OPERATION_TYPES;

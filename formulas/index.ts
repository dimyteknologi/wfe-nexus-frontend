interface IFormulaProps {
  param1: number;
  param2: number;
}

export const addCalculation = ({ param1, param2 }: IFormulaProps) => {
  return param1 + param2;
};

export const growthCalculation = ({ param1, param2 }: IFormulaProps) => {
  return param1 - param2 / 100;
};

export const multiplyCalculation = ({ param1, param2 }: IFormulaProps) => {
  return param1 * param2;
};

interface IFormulaProps {
  param1: number;
  param2: number;
}

export const projectionCalculation = ({ param1, param2 }: IFormulaProps) => {
  return param1 * (1 + param2 / 100);
};

export const projectionHistoricalData = (
  data: number[],
  growth: number,
  finalYear: number,
  initialYear: number = 2020
) => {
  const arrayHasil: number[] = [...data];

  let time = initialYear + arrayHasil.length;

  while (time <= finalYear) {
    const lastValue = arrayHasil[arrayHasil.length - 1];

    const nextValue = projectionCalculation({
      param1: lastValue,
      param2: growth,
    });

    console.log(time, nextValue);
    arrayHasil.push(nextValue);
    time += 1;
  }

  return arrayHasil;
};

const datas: number[] = [100, 200, 300, 400, 500];

const testing = projectionHistoricalData(datas, 0.5, 2030);

interface IAddProps {
  param1: number;
  param2: number;
}

export const add = ({ param1, param2 }: IAddProps) => {
  return param1 + param2;
};

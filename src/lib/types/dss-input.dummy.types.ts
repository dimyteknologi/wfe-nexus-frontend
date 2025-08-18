export type InputConfig = {
  label: string;
  periods: string[];
  withValidation?: boolean;
  id?: string;
};

export type SectionConfig = {
  title: string;
  inputs: InputConfig[];
};

export type InputGroupProps = {
  label: string;
  periods: string[];
  onChange: (id: string, value: number) => void;
  values: Record<string, number | null>;
  errors: Record<string, string>;
  id?: string;
};

export type SectionCardProps = {
  title: string;
  children: React.ReactNode;
};
export type InitialValues = Record<string, number>;

export type FormContainerProps = {
  initialValues?: InitialValues;
  inputs: Record<string, number | null>;
  errors: Record<string, string>;
  handleChange: (id: string, value: number) => void;
  validatePercentage?: (value: number) => string | undefined;
  sections: SectionConfig[];
};

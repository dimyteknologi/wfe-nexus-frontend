export type InputConfig = {
  label: string;
  periods: string[];
  withValidation?: boolean;
  id: string;
  information: string;
};

export type SectionConfig = {
  title: string;
  inputs: InputConfig[];
};

export type InputGroupProps = {
  label: string;
  periods: string[];
  onChange: (id: string, value: string) => void;
  values: Record<string, string | null>;
  errors: Record<string, string>;
  id: string;
  information: string;
};

export type SectionCardProps = {
  title: string;
  children: React.ReactNode;
};
export type InitialValues = Record<string, string>;

export type FormContainerProps = {
  initialValues?: InitialValues;
  inputs: Record<string, string | null>;
  errors: Record<string, string>;
  handleChange: (id: string, value: string) => void;
  validatePercentage?: (value: string) => string | undefined;
  sections: SectionConfig[];
};

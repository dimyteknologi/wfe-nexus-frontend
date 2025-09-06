export type Column<T> = {
  key: keyof T;
  label: string;
  className?: string;
  render?: (row: T) => React.ReactNode;
};

export type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
};

import DashboardInput from "./DashboardInput";

const InputGroup = ({
  label,
  periods,
  onChange,
  values,
  errors,
}: {
  label: string;
  periods: string[];
  onChange: (id: string, value: string) => void;
  values: Record<string, string>;
  errors: Record<string, string>;
}) => (
  <div className="mb-4">
    <p className="text-sm font-medium text-gray-600 mb-2">{label}</p>
    <div className="flex gap-2">
      {periods.map((period) => {
        const id = `${label}-${period}`.replace(/\s+/g, "-");
        return (
          <DashboardInput
            key={id}
            title={period}
            value={values[id] || ""}
            onChange={(e) => onChange(id, e.target.value)}
            error={errors[id]}
          />
        );
      })}
    </div>
  </div>
);

export default InputGroup;

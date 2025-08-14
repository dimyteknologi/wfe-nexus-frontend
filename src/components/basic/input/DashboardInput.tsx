interface IDashboardInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  error?: string;
}

const DashboardInput = ({
  title,
  error,
  className,
  onChange,
  ...otherProps
}: IDashboardInputProps) => {
  const baseStyles = `w-full px-4 py-3 rounded-xl outline-none text-center font-medium border ${error ? "border-red-500" : "border-gray-200 hover:border-blue-400"} bg-white shadow-sm`;

  return (
    <div className="flex flex-col justify-center gap-1">
      <input
        type="number"
        className={`${baseStyles}} ${error ? "ring-1 ring-red-500" : ""}`}
        onChange={onChange}
        {...otherProps}
      />
      <div className="flex justify-center items-center relative">
        <label className="text-sm text-gray-600 font-light">{title}</label>
        {error && (
          <div className="absolute letf-4 translate-x-4 p-4 rounded-2xl bg-gray-600 text-white w-36 text-center shadow-lg z-50">
            <p className="text-xs">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardInput;

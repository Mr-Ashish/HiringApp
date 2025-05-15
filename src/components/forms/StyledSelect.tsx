interface StyledSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

export function StyledSelect({ label, children, ...props }: StyledSelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <select
        {...props}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {children}
      </select>
    </div>
  );
}

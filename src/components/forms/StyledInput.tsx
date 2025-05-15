interface StyledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function StyledInput({ label, ...props }: StyledInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        {...props}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

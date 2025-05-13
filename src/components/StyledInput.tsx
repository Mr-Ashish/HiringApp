import React from "react";

interface StyledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
}

const baseClass =
  "mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 shadow-sm focus:border-indigo-500 focus:bg-white focus:ring-indigo-500 transition placeholder-gray-400";

export function StyledInput({ label, required, ...props }: StyledInputProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input className={baseClass} required={required} {...props} />
    </div>
  );
}

interface StyledSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  required?: boolean;
  children: React.ReactNode;
}

export function StyledSelect({
  label,
  required,
  children,
  ...props
}: StyledSelectProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select className={baseClass} required={required} {...props}>
        {children}
      </select>
    </div>
  );
}

interface StyledTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  required?: boolean;
}

export function StyledTextarea({
  label,
  required,
  ...props
}: StyledTextareaProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea className={baseClass} required={required} {...props} />
    </div>
  );
}

export default StyledInput;

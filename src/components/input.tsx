import React from "react";

interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  className?: string;
  onBlur?: () => void;
  onFocus?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  placeholder,
  type,
  className,
  onBlur,
  onFocus,
  onKeyDown,
}) => {
  return (
    <input
      type={type || "text"}
      placeholder={placeholder}
      value={value}
      onBlur={onBlur}
      onFocus={onFocus}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      className={`border p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      required
    />
  );
};

export default InputField;

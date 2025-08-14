import { useState } from "react";

interface InputProps {
  label: string;
  value?: string;
  type?: string;
  id?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

const Input = ({
  label,
  value = "",
  type = "text",
  id,
  placeholder = "",
  onChange,
}: InputProps) => {
  const [internalValue, setInternalValue] = useState(value);
  const inputId = id || label.replace(/\s+/g, "-").toLowerCase();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <div className="pb-2 pt-4 my-2 flex flex-col gap-2 items-start">
      <label htmlFor={inputId}>{label}:</label>
      <input
        type={type}
        name={inputId}
        id={inputId}
        value={internalValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="block w-full p-2 text-lg border border-gray-800 text-gray-800 focus:outline-none rounded-sm focus:border-gray-300"
      />
    </div>
  );
};

export default Input;

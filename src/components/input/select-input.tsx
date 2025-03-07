import { ComponentProps } from "react";

type Option = {
  name: string;
  value: string;
};

type SelectProps = {
  name: string;
  label?: string;
  options: Option[];
  placeholder?: string;
  errorMessage?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
} & ComponentProps<"select">;

const Select = ({
  name,
  label,
  options,
  placeholder,
  errorMessage,
  value,
  onChange,
  disabled,
  ...props
}: SelectProps) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`flex w-full flex-1 h-12 mb-2 items-center !rounded-lg border ${
          errorMessage ? "border-red-500" : "border-[#D0D5DD]"
        } !bg-white !px-[16px] !py-[12px] !text-base !font-normal !font-dmSans ${
          disabled ? "!text-textSecondary" : "!text-textSecondary"
        } placeholder:!text-gray-150`}
        aria-invalid={!!errorMessage}
        aria-describedby={errorMessage ? `${name}-error` : undefined}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>

      {errorMessage && (
        <span className="text-red-600 font-dmSans text-sm">{errorMessage}</span>
      )}
    </div>
  );
};

export default Select;

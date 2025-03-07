interface IProps {
  name: string;
  label: string;
  type: string;
  value: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  errorMessage?: string;
}

const TextInput = (props: IProps) => {
  const {
    name,
    label,
    type,
    value,
    onChange,
    placeholder,
    errorMessage,
    disabled,
  } = props;
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          disabled={disabled}
          onChange={onChange as any}
          placeholder={placeholder}
          className={`flex w-full flex-1 min-h-[96px] mb-2 items-center !rounded-lg border border-[#D0D5DD]
            !bg-white !px-[16px] !py-[12px] !text-base !font-normal !font-dmSans ${
              disabled ? "!text-textSecondary" : "!text-textSecondary"
            }  placeholder:!text-gray-150`}
        />
      ) : type === "date" ? (
        <input
          id={name}
          name={name}
          type="date"
          value={value}
          disabled={disabled}
          onChange={onChange}
          placeholder={placeholder}
          className={`flex w-full flex-1 h-12 mb-2 items-center !rounded-lg border border-[#D0D5DD]
            !bg-white !px-[16px] !py-[12px] !text-base !font-normal !font-dmSans ${
              disabled ? "!text-textSecondary" : "!text-textSecondary"
            }  placeholder:!text-gray-150`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          disabled={disabled}
          onChange={onChange}
          placeholder={placeholder}
          className={`flex w-full flex-1 h-12 mb-2 items-center !rounded-lg border border-[#D0D5DD]
            !bg-white !px-[16px] !py-[12px] !text-base !font-normal !font-dmSans ${
              disabled ? "!text-textSecondary" : "!text-textSecondary"
            }  placeholder:!text-gray-150`}
        />
      )}
      {errorMessage && (
        <span className="text-red-600 font-dmSans text-sm">{errorMessage}</span>
      )}
    </div>
  );
};

export default TextInput;

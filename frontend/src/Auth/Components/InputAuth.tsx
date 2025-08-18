const InputAuth = ({
  label,
  type = "text",
  placeholder,
  name,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <label className="flex flex-col gap-2 min-[768px]:gap-3 group">
      <p className="text-[12px] min-[768px]:text-[18px] min-[1440px]:text-[20px] opacity-50 group-hover:opacity-100 group-focus-within:opacity-100">
        {label}
      </p>
      <input
        className="focus:outline focus:outline-[var(--accent)] focus:text-[var(--text)] focus-within:text-[var(--text)] focus-within:outline focus-within:outline-[var(--accent)] p-2 text-[var(--text)]/50  bg-[var(--surface)] w-[250px] text-[10px] h-[30px] min-[768px]:h-[50px] min-[768px]:w-[640px] min-[768px]:text-[16px] min-[1440px]:w-[816px] min-[1440px]:text-[20px] "
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
      />{" "}
    </label>
  );
};

export default InputAuth;

const InputModal = ({
  isTextarea,
  placeholder,
  label,
  textareaWidth,
  textareaHeight,
  name,
  value,
  onChange,
}: {
  isTextarea?: boolean;
  textareaWidth?: string;
  textareaHeight?: string;
  placeholder: string;
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) => {
  return (
    <div className="flex flex-col gap-2 w-[250px]">
      <label>{label}</label>
      {isTextarea ? (
        <textarea
          className={`resize-none focus:outline focus:outline-[var(--accent)] focus:text-[var(--text)] focus-within:text-[var(--text)] focus-within:outline focus-within:outline-[var(--accent)] p-2 text-[var(--text)]/50 bg-[var(--surface)] ${textareaWidth} ${textareaHeight} `}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
        ></textarea>
      ) : (
        <input
          className="focus:outline focus:outline-[var(--accent)] focus:text-[var(--text)] focus-within:text-[var(--text)] focus-within:outline focus-within:outline-[var(--accent)] p-2 text-[var(--text)]/50  bg-[var(--surface)] "
          type="text"
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default InputModal;

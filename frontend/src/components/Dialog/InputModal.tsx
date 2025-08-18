const InputModal = ({
  isTextarea,
  placeholder,
  label,
  textareaWidth,
  textareaHeight,
  name,
  value,
  onChange,
  extraClass,
  language,
}: {
  isTextarea?: boolean;
  textareaWidth?: string;
  textareaHeight?: string;
  placeholder: string;
  label: string;
  name: string;
  value: string;
  extraClass?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  language: "eng" | "pl" | "deu";
}) => {
  const nameLabel = () => {
    switch (language) {
      case "deu":
        return "Name der Ware";
      case "pl":
        return "Nazwa towaru";
      default:
        return "Name of Good";
    }
  };

  const storeLabel = () => {
    switch (language) {
      case "deu":
        return "Laden";
      case "pl":
        return "Sklep";
      default:
        return "Store";
    }
  };

  const description = () => {
    switch (language) {
      case "deu":
        return "Beschreibung";
      case "pl":
        return "Opis";
      default:
        return "Description";
    }
  };

  const labelFinal = () => {
    return label == "Name of good"
      ? nameLabel()
      : label == "Description"
      ? description()
      : storeLabel();
  };

  return (
    <div
      className={`flex flex-col gap-2 w-[250px] min-[768px]:w-[495px] ${extraClass}`}
    >
      <label className="text-[12px] min-[768px]:text-[18px] min-[1440px]:text-[20px] opacity-50 group-hover:opacity-100 group-focus-within:opacity-100 ">
        {labelFinal()}
      </label>
      {isTextarea ? (
        <textarea
          className={`resize-none focus:outline focus:outline-[var(--accent)] focus:text-[var(--text)] focus-within:text-[var(--text)] focus-within:outline focus-within:outline-[var(--accent)] p-2 text-[var(--text)]/50 bg-[var(--surface)] text-[10px] min-[768px]:text-[16px] ${textareaWidth} ${textareaHeight} `}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
        ></textarea>
      ) : (
        <input
          className="focus:outline focus:outline-[var(--accent)] focus:text-[var(--text)] focus-within:text-[var(--text)] focus-within:outline focus-within:outline-[var(--accent)] p-2 text-[var(--text)]/50  bg-[var(--surface)] text-[10px] h-[30px] min-[768px]:h-[50px] min-[768px]:w-[495px]  min-[768px]:text-[16px]"
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

import { useContext, useState } from "react";
import {
  languageContext,
  type Languages,
} from "../../Contexts/languageContext";

const ChoseLanguage = () => {
  const [isOpenMenu, setMenuStatus] = useState(false);
  const langContextVal = useContext(languageContext);
  const languages: Record<
    "eng" | "deu" | "pl",
    "English" | "Deutsch" | "Polski"
  > = {
    eng: "English",
    deu: "Deutsch",
    pl: "Polski",
  };
  if (!langContextVal) {
    throw new Error("SomeComponent must be used within MyProvider");
  }

  const { language, setLanguage } = langContextVal;

  const openMenu = () => {
    setMenuStatus(true);
  };
  const closeMenu = () => {
    setMenuStatus(false);
  };

  const langToChose = Object.values(languages);

  return (
    <div className="relative">
      <button
        className="text-[var(--primary)] relative min-[768px]:text-[20px] min-[1440px]:text-[28px] "
        onClick={() => {
          if (!isOpenMenu) {
            openMenu();
          } else {
            closeMenu();
          }
        }}
      >
        <span className="text-[var(--primary)]">{language}</span>
        <span className="text-[var(--primary)]/50 ">▼</span>
      </button>
      {isOpenMenu && (
        <ul className="absolute right-0 z-[5]">
          {langToChose.map((l, index) => {
            return (
              <li key={index}>
                <button
                  className={`w-20 px-2 py-1 min-[768px]:w-24 min-[1440px]:w-28 min-[1440px]:px-3 min-[1440px]:py-2 flex
                ${
                  language == (Object.keys(languages)[index] as Languages)
                    ? "text-[var(--background)] bg-[var(--primary)]"
                    : "text-[var(--primary)] bg-[var(--surface)]"
                }
                      `}
                  onClick={() => {
                    setLanguage(Object.keys(languages)[index] as Languages);
                    localStorage.setItem(
                      "lang",
                      Object.keys(languages)[index] as Languages
                    );
                    closeMenu();
                  }}
                >
                  {l}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ChoseLanguage;

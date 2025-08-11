import { useContext, useState } from "react";
import { themeContext } from "../../Contexts/themeContext";
import { languageContext } from "../../Contexts/languageContext";

const ChoseTheme = () => {
  const [isOpenMenu, setMenuStatus] = useState(false);
  const tContext = useContext(themeContext);
  const lContext = useContext(languageContext);
  const themeList: ["light", "dark", "colorful"] = [
    "light",
    "dark",
    "colorful",
  ];

  const openMenu = () => {
    setMenuStatus(true);
  };
  const closeMenu = () => {
    setMenuStatus(false);
  };

  if (!tContext) {
    throw new Error("SomeComponent must be used within MyProvider");
  }
  if (!lContext) {
    throw new Error("SomeComponent must be used within MyProvider");
  }

  const { theme, setTheme } = tContext;

  const writtenValue = (theme: string) => {
    if (lContext.language == "eng") {
      return theme;
    } else if (lContext.language == "deu") {
      if (theme == "light") return "licht";
      if (theme == "dark") return "dunkel";
      if (theme == "colorful") return "bunt";
    } else {
      if (theme == "light") return "jasny";
      if (theme == "dark") return "ciemny";
      if (theme == "colorful") return "kolorowy";
    }
  };

  return (
    <div className="relative">
      <button
        className="flex items-center h-full px-2 "
        onClick={() => {
          if (isOpenMenu) {
            closeMenu();
          } else {
            openMenu();
          }
        }}
      >
        <span className="size-2 bg-[var(--primary)] rounded-full "></span>{" "}
        <span className="text-[var(--primary)]/50 ">▼</span>
      </button>

      {isOpenMenu ? (
        <ul className="absolute right-0 flex flex-col">
          {themeList.map((t, index) => {
            return (
              <li key={index}>
                <button
                  className={`w-[100px] px-2 py-1 flex ${
                    theme == t
                      ? "text-[var(--background)] bg-[var(--primary)]"
                      : "text-[var(--primary)] bg-[var(--surface)]"
                  } `}
                  onClick={() => {
                    setTheme(t);
                    localStorage.setItem("theme", t);
                    closeMenu();
                  }}
                >
                  <span className="mr-auto">{writtenValue(t)}</span>{" "}
                  {theme == t && "✓"}
                </button>
              </li>
            );
          })}

          {/* <li className="w-20 px-2 py-1">
            <button>dark</button>
          </li>
          <li className="w-20 px-2 py-1">
            <button>colorful</button>
          </li> */}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ChoseTheme;

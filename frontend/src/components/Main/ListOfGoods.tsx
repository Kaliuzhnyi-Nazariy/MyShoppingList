import { useContext } from "react";
import { themeContext } from "../../Contexts/themeContext";
import { languageContext } from "../../Contexts/languageContext";

const ListOfGoods = () => {
  const goods = [];
  const tContext = useContext(themeContext);
  const lContext = useContext(languageContext);

  if (!tContext || !lContext) {
    throw new Error("SomeComponent must be used within MyProvider");
  }
  //   const { theme, setTheme } = tContext;
  const { language } = lContext;

  return (
    <div className="w-full  flex flex-col flex-1 items-center justify-center">
      {goods.length == 0 ? (
        <>
          <p></p>
          <button>
            {language == "eng"
              ? "There are no goods in the list."
              : language == "deu"
              ? "Es sind keine Waren in der Liste aufgeführt."
              : "W liście nie ma żadnych  towarów."}
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ListOfGoods;

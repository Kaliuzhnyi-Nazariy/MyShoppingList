import { useContext } from "react";
import { themeContext } from "../../Contexts/themeContext";
import { languageContext } from "../../Contexts/languageContext";

const ListOfGoods = () => {
  // const goods = [];
  const goods = [
    { id: 1, nameOfGood: "Bread", description: "", store: "Store" },
    { id: 2, nameOfGood: "Bottle of water", description: "5L", store: "Store" },
  ];
  const tContext = useContext(themeContext);
  const lContext = useContext(languageContext);

  if (!tContext || !lContext) {
    throw new Error("SomeComponent must be used within MyProvider");
  }
  //   const { theme, setTheme } = tContext;
  const { language } = lContext;

  return (
    <div className="w-full  flex flex-col flex-1 items-center px-5 min-[768px]:px-10 min-[1440px]:px-20">
      {goods.length == 0 && (
        <div className=" justify-center">
          <p className="opacity-50 ">
            {language == "eng"
              ? "There are no goods in the list."
              : language == "deu"
              ? "Es sind keine Waren in der Liste aufgeführt."
              : "W liście nie ma żadnych  towarów."}
          </p>
          <button className="bg-[var(--accent)] px-6 py-1 rounded-[10px] mt-3 border border-transparent hover:border-[var(--accent)] transition-colors hover:bg-transparent focus:outline focus:outline-[var(--accent)] focus:bg-transparent duration-300">
            {language == "eng"
              ? "+ Add to list"
              : language == "deu"
              ? "+ Zur Liste hinzufügen"
              : "+ Dodać do listy"}
          </button>
        </div>
      )}
      {goods.length > 0 && (
        <>
          <button className="ml-auto mt-4 text-[var(--text)]/50">
            {language == "eng"
              ? "+ Add to list"
              : language == "deu"
              ? "+ Zur Liste hinzufügen"
              : "+ Dodać do listy"}
          </button>
          <ul className="w-full mt-4 flex flex-col gap-2.5 min-[768px]:gap-6 min-[1440px]:gap-10 ">
            {goods.map((g) => {
              return (
                <li
                  className="h-10  min-w-[280px] bg-[var(--surface)] text-[var(--text)] px-2 py-1 flex justify-between min-[768px]:h-[60px] min-[1440px]:h-20 "
                  key={g.id}
                >
                  <div className="">
                    <h2>{g.nameOfGood}</h2>
                    {g.description ? <p>{g.description}</p> : <></>}
                  </div>
                  <p>{g.store}</p>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default ListOfGoods;

// className =
//   "h-10 w-[280px] bg-[var(--surface)] text-[var(--text)] px-2 py-1 flex justify-between ";

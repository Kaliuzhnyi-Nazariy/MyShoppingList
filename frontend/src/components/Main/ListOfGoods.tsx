import { useContext, useEffect, useState } from "react";
import { themeContext } from "../../Contexts/themeContext";
import { languageContext } from "../../Contexts/languageContext";
import AddModal from "../Dialog/AddModal";
import { useQuery } from "@tanstack/react-query";
import { getAll } from "../../Query/list";
import type { ListItemDB } from "../../types";
import UpdateModal from "../Dialog/UpdateModal";

const ListOfGoods = () => {
  const tContext = useContext(themeContext);
  const lContext = useContext(languageContext);

  const [dataToUpdate, setDataToUpdate] = useState<ListItemDB>(
    {} as ListItemDB
  );

  if (!tContext || !lContext) {
    throw new Error("SomeComponent must be used within MyProvider");
  }

  const { language } = lContext;

  const { data, isLoading } = useQuery({
    queryKey: ["getGoods"],
    queryFn: getAll,
  });

  useEffect(() => {
    getAll();
  }, [data]);

  if (isLoading)
    return (
      <div className="w-full flex flex-1 items-center justify-center">
        <h3>Loading...</h3>
      </div>
    );

  return (
    <div className="w-full  flex flex-col flex-1 items-center px-5 min-[768px]:px-10 min-[1440px]:px-20">
      {data.length == 0 && !isLoading && (
        <div className=" justify-center">
          <p className="opacity-50 ">
            {language == "eng"
              ? "There are no goods in the list."
              : language == "deu"
              ? "Es sind keine Waren in der Liste aufgeführt."
              : "W liście nie ma żadnych  towarów."}
          </p>
          <button
            className="bg-[var(--accent)] px-6 py-1 rounded-[10px] mt-3 border border-transparent hover:border-[var(--accent)] transition-colors hover:bg-transparent focus:outline focus:outline-[var(--accent)] focus:bg-transparent duration-300"
            onClick={() => {
              if (document && document.getElementById("add_product_modal")) {
                (
                  document.getElementById(
                    "add_product_modal"
                  ) as HTMLDialogElement
                ).showModal();
              }
            }}
          >
            {language == "eng"
              ? "+ Add to list"
              : language == "deu"
              ? "+ Zur Liste hinzufügen"
              : "+ Dodać do listy"}
          </button>
        </div>
      )}
      {data.length > 0 && (
        <>
          <button
            className="ml-auto mt-4 text-[var(--text)]/50"
            onClick={() => {
              if (document && document.getElementById("add_product_modal")) {
                (
                  document.getElementById(
                    "add_product_modal"
                  ) as HTMLDialogElement
                ).showModal();
              }
            }}
          >
            {language == "eng"
              ? "+ Add to list"
              : language == "deu"
              ? "+ Zur Liste hinzufügen"
              : "+ Dodać do listy"}
          </button>
          <ul className="w-full mt-4 flex flex-col gap-2.5 min-[768px]:gap-6 min-[1440px]:gap-10 mb-10">
            {data.map((g: ListItemDB) => {
              return (
                <li
                  className="h-10  min-w-[280px] bg-[var(--surface)] text-[var(--text)] px-2 py-1 flex justify-between min-[768px]:h-[60px] min-[1440px]:h-20 "
                  key={g.id}
                  onClick={() => {
                    (
                      document.getElementById(
                        "update_modal"
                      ) as HTMLDialogElement
                    ).showModal();
                    setDataToUpdate(g);
                  }}
                >
                  <div className="">
                    <h2>{g.good}</h2>
                    {g.description ? <p>{g.description}</p> : <></>}
                  </div>
                  <p>{g.store}</p>
                </li>
              );
            })}
          </ul>
        </>
      )}
      <AddModal />
      <UpdateModal data={dataToUpdate} />
    </div>
  );
};

export default ListOfGoods;

// className =
//   "h-10 w-[280px] bg-[var(--surface)] text-[var(--text)] px-2 py-1 flex justify-between ";

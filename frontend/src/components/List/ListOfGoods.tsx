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

  const { data, isLoading } = useQuery<ListItemDB[] | undefined>({
    queryKey: ["getGoods"],
    queryFn: getAll,
    retry: false,
    refetchOnMount: true,
    throwOnError: false,
    refetchOnWindowFocus: false,
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
    <div className="w-full flex flex-col flex-1 items-center px-5 min-[768px]:px-10 min-[1440px]:px-20">
      {data && data.length == 0 && !isLoading && (
        <div className=" justify-center flex flex-col flex-1 text-[var(--text)]">
          <p className="opacity-50 text-[18px] min-[768px]:text-2xl min-[1440px]:text-[28px] text-center ">
            {language == "eng"
              ? "There are no goods in the list."
              : language == "deu"
              ? "Es sind keine Waren in der Liste aufgeführt."
              : "W liście nie ma żadnych  towarów."}
          </p>
          <button
            className="bg-[var(--accent)] w-auto self-center px-6 py-1 rounded-[10px] mt-3 min-[768px]:mt-4 min-[1440px]:mt-[54px] border border-transparent hover:border-[var(--accent)] transition-colors hover:bg-transparent focus:outline focus:outline-[var(--accent)] focus:bg-transparent duration-300 min-[768px]:px-[18px] min-[768px]:py-2 min-[1440px]:px-6 min-[1440px]:py-1.5 "
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
      {data && data.length > 0 && (
        <>
          <button
            className="ml-auto mt-4 text-[var(--text)]/50 text-[12px] min-[768px]:text-[18px] "
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
            {Array.isArray(data) &&
              data.length > 0 &&
              data?.map((g: ListItemDB) => {
                return (
                  <li
                    className="h-10  min-w-[280px] bg-[var(--surface)] text-[var(--text)] px-2 py-1 flex justify-between min-[768px]:h-[60px] min-[1440px]:h-20 min-[768px]:py-2 min-[768px]:px-5 min-[1440px]:px-[18px] min-[1440px]:py-2.5 "
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
                    <div className="flex flex-col justify-between w-[80%] overflow-hidden">
                      <h2 className="max-[767px]:text-[12px] min-[768px]:text-[18px] min-[1440px]:text-[20px]">
                        {g.good}
                      </h2>
                      {g.description ? (
                        <p className="text-[8px] min-[768px]:text-[12px] min-[1440px]:text-[16px] overflow-ellipsis whitespace-nowrap overflow-hidden ">
                          {g.description}
                        </p>
                      ) : (
                        <></>
                      )}
                    </div>
                    <p className="text-[8px] min-[768px]:text-[18px]">
                      {g.store}
                    </p>
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

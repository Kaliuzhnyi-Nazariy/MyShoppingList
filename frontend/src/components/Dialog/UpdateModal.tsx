import React, { useContext, useEffect, useState } from "react";
import { languageContext } from "../../Contexts/languageContext";
import type { ErrorMessage, ListItem, ListItemDB } from "../../types";
import InputModal from "./InputModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteItem, updateItem } from "../../Query/list";
import { successToast } from "../Toasts/Success";
import { errorToast } from "../Toasts/error";

const UpdateModal = ({ data }: { data: ListItemDB }) => {
  const [formData, setFormData] = useState<ListItem>({
    nameOfGood: data.good || "",
    description: data.description || "",
    store: data.store || "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        nameOfGood: data.good,
        description: data.description,
        store: data.store,
      });
    }
  }, [data]);

  const clearForm = () => {
    setFormData({
      nameOfGood: "",
      description: "",
      store: "",
    });
  };

  const setData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const lContext = useContext(languageContext);

  if (!lContext) {
    throw new Error("SomeComponent must be used within MyProvider");
  }

  const { language } = lContext;

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: ListItem) =>
      updateItem({ id: data ? data.id : -1, data: formData }),
    onSuccess() {
      (document.getElementById("update_modal") as HTMLDialogElement).close();
      clearForm();
      queryClient.invalidateQueries({ queryKey: ["getGoods"] });
    },
    onError(err: ErrorMessage) {
      errorToast(err.response.data.message);
    },
  });

  const queryClient = useQueryClient();

  const { mutate: deleteMutation, isPending: isPendingDelete } = useMutation({
    mutationFn: () => {
      if (data) {
        return deleteItem(data.id);
      } else {
        return deleteItem(-1);
      }
    },
    onSuccess() {
      successToast("Product deleted!");
      (document.getElementById("update_modal") as HTMLDialogElement).close();
      clearForm();
      queryClient.invalidateQueries({ queryKey: ["getGoods"] });
    },
    onError(err: ErrorMessage) {
      errorToast(err.response.data.message);
    },
  });

  const title = () => {
    return language == "pl"
      ? "AKTUALIZACJA"
      : language == "eng"
      ? "Update"
      : "AKTUALISIERUNG";
  };

  return (
    <dialog id="update_modal" className="modal">
      <div className="modal-box w-[280px] h-[400px] bg-[var(--background)] text-[var(--text)] flex flex-col items-center justify-center py-[30px] px-[15px] min-[768px]:min-w-[575px] min-[768px]:h-[645px] min-[768px]:px-10 min-[768px]:py-[45px] min-[1440px]:min-w-[1200px] min-[1440px]:h-[365px] min-[1440px]:px-[60px] min-[1440px]:py-5  overflow-hidden  ">
        <form
          className="flex flex-col items-center gap-3 min-[768px]:gap-y-6 min-[1440px]:grid min-[1440px]:grid-cols-2 min-[1440px]:grid-rows-[repeat(4,auto)] min-[1440px]:gap-x-[90px] overflow-hidden  "
          onSubmit={(e) => {
            e.preventDefault();
            mutate(formData);
            successToast("Product updated!");
          }}
        >
          <h3 className="text-[18px] uppercase">{title()}</h3>
          <InputModal
            label="Name of good"
            placeholder="name of good"
            name="nameOfGood"
            value={formData.nameOfGood}
            onChange={setData}
            language={language}
          />
          <InputModal
            label="Description"
            placeholder="Description"
            isTextarea
            textareaWidth="min-[768px]:w-[495px]"
            textareaHeight="h-[90px] min-[768px]:h-[145px] min-[1440px]:h-[223px] "
            name="description"
            value={formData.description}
            onChange={setData}
            extraClass="col-2 row-start-1 row-end-4"
            language={language}
          />
          <InputModal
            label="Store"
            placeholder="store..."
            name="store"
            value={formData.store}
            onChange={setData}
            language={language}
          />
          {isPending ? (
            <div className="loading loading-spinner loading-sm"></div>
          ) : (
            <ul className="flex gap-5 mt-1 min-[1440px]:m-0 min-[1440px]:col-span-2 min-[1440px]:row-4 min-[1440px]:grid min-[1440px]:grid-cols-2  ">
              <li className="min-[1440px]:justify-self-center">
                {isPendingDelete ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <button
                    className="bg-[var(--primary)] w-[114px] h-8 rounded-[10px] border border-transparent hover:border-[var(--accent)] transition-colors hover:bg-transparent focus:outline focus:outline-[var(--accent)] focus:bg-transparent duration-300 disabled:opacity-50 min-[768px]:w-[240px] min-[768px]:h-12 min-[768px]:text-2xl] min-[1440px]:w-[224px] min-[1440px]:h-[36px] min-[1440px]:text-[18px] min-[1440px]:col-end-1 "
                    type="button"
                    disabled={!formData.nameOfGood || !formData.store}
                    onClick={() => deleteMutation()}
                  >
                    {language == "eng"
                      ? "Delete"
                      : language == "deu"
                      ? "Löschen"
                      : "Usunąć"}
                  </button>
                )}
              </li>
              <li className="min-[1440px]:justify-self-center">
                <button
                  className="bg-[var(--accent)] w-[114px] h-8 rounded-[10px] border border-transparent hover:border-[var(--accent)] transition-colors hover:bg-transparent focus:outline focus:outline-[var(--accent)] focus:bg-transparent duration-300 disabled:opacity-50 min-[768px]:w-[240px] min-[768px]:h-12 min-[768px]:text-2xl] min-[1440px]:w-[224px] min-[1440px]:h-[36px] min-[1440px]:text-[18px] min-[1440px]:col-start-2 "
                  disabled={!formData.nameOfGood || !formData.store}
                >
                  {language == "eng"
                    ? "Update"
                    : language == "deu"
                    ? "Aktualisierung"
                    : "Aktualizować"}
                </button>
              </li>
            </ul>
          )}
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default UpdateModal;

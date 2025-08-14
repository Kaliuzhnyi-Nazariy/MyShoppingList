import React, { useContext, useEffect, useState } from "react";
import { languageContext } from "../../Contexts/languageContext";
import type { ListItem, ListItemDB } from "../../types";
import InputModal from "./InputModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteItem, updateItem } from "../../Query/list";

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
      clearForm();
      (document.getElementById("update_modal") as HTMLDialogElement).close();
      queryClient.invalidateQueries({ queryKey: ["getGoods"] });
    },
    onError(err: { message: string }) {
      console.error(err.message);
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
      clearForm();
      (document.getElementById("update_modal") as HTMLDialogElement).close();
      queryClient.invalidateQueries({ queryKey: ["getGoods"] });
    },
    onError(err: { message: string }) {
      console.error(err.message);
    },
  });

  return (
    <dialog id="update_modal" className="modal">
      <div className="modal-box w-[280px] h-[400px] bg-[var(--background)] flex flex-col items-center justify-center py-[30px] px-[15px]">
        <h3 className="text-[18px] uppercase">add good to list</h3>
        <form
          className="flex flex-col items-center gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            console.log(formData);
            mutate(formData);
          }}
        >
          <InputModal
            label="Name of good"
            placeholder="name of good"
            name="nameOfGood"
            value={formData.nameOfGood}
            onChange={setData}
          />
          <InputModal
            label="Description"
            placeholder="Description"
            isTextarea
            textareaWidth=""
            textareaHeight="h-[90px]"
            name="description"
            value={formData.description}
            onChange={setData}
          />
          <InputModal
            label="Store"
            placeholder="store..."
            name="store"
            value={formData.store}
            onChange={setData}
          />
          {isPending ? (
            <div className="loading loading-spinner loading-sm"></div>
          ) : (
            <ul className="flex gap-5">
              <li>
                {isPendingDelete ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <button
                    className="bg-[var(--primary)] w-[114px] h-8 rounded-[10px] border border-transparent hover:border-[var(--accent)] transition-colors hover:bg-transparent focus:outline focus:outline-[var(--accent)] focus:bg-transparent duration-300 mt-4 disabled:opacity-50"
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
              <li>
                <button
                  className="bg-[var(--accent)] w-[114px] h-8 rounded-[10px] border border-transparent hover:border-[var(--accent)] transition-colors hover:bg-transparent focus:outline focus:outline-[var(--accent)] focus:bg-transparent duration-300 mt-4 disabled:opacity-50"
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

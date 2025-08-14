import { useContext, useState } from "react";
import InputModal from "./InputModal";
import type { ListItem } from "../../types";
import { languageContext } from "../../Contexts/languageContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postItem } from "../../Query/list";

const AddModal = () => {
  const [formData, setFormData] = useState<ListItem>({
    nameOfGood: "",
    description: "",
    store: "",
  });

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

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: ListItem) => postItem(formData),
    onSuccess() {
      clearForm();
      (
        document.getElementById("add_product_modal") as HTMLDialogElement
      )?.close();
      queryClient.invalidateQueries({ queryKey: ["getGoods"] });
    },
    onError(error: { message: string }) {
      console.log(error);
    },
  });

  return (
    <dialog id="add_product_modal" className="modal">
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
            <button
              className="bg-[var(--accent)] px-6 py-1 rounded-[10px] border border-transparent hover:border-[var(--accent)] transition-colors hover:bg-transparent focus:outline focus:outline-[var(--accent)] focus:bg-transparent duration-300 mt-4 disabled:opacity-50"
              disabled={!formData.nameOfGood || !formData.store}
            >
              {language == "eng"
                ? "+ Add to list"
                : language == "deu"
                ? "+ Zur Liste hinzufügen"
                : "+ Dodać do listy"}
            </button>
          )}
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default AddModal;

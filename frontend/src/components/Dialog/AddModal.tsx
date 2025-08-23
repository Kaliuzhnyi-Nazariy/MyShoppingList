import { useContext, useState } from "react";
import InputModal from "./InputModal";
import type { ErrorMessage, ListItem } from "../../types";
import { languageContext } from "../../Contexts/languageContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postItem } from "../../Query/list";
import { successToast } from "../Toasts/Success";
import { errorToast } from "../Toasts/error";

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
      successToast("Product added!");
    },
    onError(error: ErrorMessage) {
      errorToast(error.response.data.message);
    },
  });

  const title = () => {
    return language === "pl"
      ? "DODAĆ DO LISTY"
      : language === "deu"
      ? "ZUR LISTE HINZUFÜGEN"
      : "add good to list";
  };

  return (
    <dialog id="add_product_modal" className="modal">
      <div className="modal-box w-[280px] h-[400px] bg-[var(--background)] text-[var(--text)] flex flex-col items-center justify-center py-[30px] px-[15px] min-[768px]:min-w-[575px] min-[768px]:h-[645px] min-[768px]:px-10 min-[768px]:py-[45px] min-[1440px]:min-w-[1200px] min-[1440px]:h-[365px] min-[1440px]:px-[60px] min-[1440px]:py-5 overflow-hidden ">
        <form
          className="flex flex-col items-center gap-3 min-[768px]:gap-y-6 min-[1440px]:grid min-[1440px]:grid-cols-2 min-[1440px]:grid-rows-[repeat(4,auto)] min-[1440px]:gap-x-[90px] overflow-hidden  "
          onSubmit={(e) => {
            e.preventDefault();
            // console.log(formData);
            mutate(formData);
          }}
        >
          <h3 className="text-[18px] uppercase min-[768px]:text-[28px] min-[1440px]:grid-col- min-[1440px]:grid-row  ">
            {title()}
          </h3>
          <InputModal
            label="Name of good"
            placeholder="Name of good"
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
            placeholder="Store..."
            name="store"
            value={formData.store}
            onChange={setData}
            language={language}
          />
          {isPending ? (
            <div className="loading loading-spinner loading-sm min-[1440px]:col-span-2 min-[1440px]:row-3 "></div>
          ) : (
            <button
              className="bg-[var(--accent)] px-6 py-1 rounded-[10px] border border-transparent hover:border-[var(--accent)] transition-colors hover:bg-transparent focus:outline focus:outline-[var(--accent)] focus:bg-transparent duration-300 mt-1 disabled:opacity-50 min-[768px]:mt-2 min-[768px]:text-2xl min-[768px]:h-12 min-[768px]:w-[310px] min-[1440px]:col-span-2 min-[1440px]:justify-self-center min-[1440px]:self-center min-[1440px]:m-0 min-[1440px]:row-4 min-[1440px]:w-[224px] min-[1440px]:h-[36px] min-[1440px]:text-[18px] min-[1440px]:px-0 "
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

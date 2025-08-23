import toast from "react-hot-toast";

export const successToast = (message: string) => {
  return toast.success(message, { position: "top-right", duration: 3000 });
};

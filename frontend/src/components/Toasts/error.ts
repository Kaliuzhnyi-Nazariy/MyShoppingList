import toast from "react-hot-toast";

export const errorToast = (message: string) => {
  return toast.error(message, { position: "top-right", duration: 3000 });
};

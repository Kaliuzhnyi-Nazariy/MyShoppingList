import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { deleteUser, logout } from "../../../Query/user";
import { LogOut, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { languageContext } from "../../../Contexts/languageContext";
import type { ErrorMessage, IUser } from "../../../types";
import { errorToast } from "../../Toasts/error";
import { successToast } from "../../Toasts/Success";

const UserButton = ({ name }: { name: string }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: logOut, isPending: isLoading } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess() {
      queryClient.removeQueries({ queryKey: ["getUserData"] });
      router("/signin");
      successToast(`Bye!`);
    },
    onError(err: ErrorMessage) {
      errorToast(err.response.data.message);
    },
  });

  const { mutate: del, isPending: delLoading } = useMutation({
    mutationFn: deleteUser,
    onSuccess(user: IUser) {
      queryClient.removeQueries({ queryKey: ["getUserData"] });
      router("/signin");
      successToast(
        `We're sorry to see you go, ${user.name}. Your account has been deleted.`
      );
    },
    onError(err: ErrorMessage) {
      errorToast(err.response.data.message);
    },
  });

  const lContext = useContext(languageContext);

  if (!lContext) return "LContext don`t work";

  const { language } = lContext;

  return (
    <div className="relative text-[var(--text)]">
      <button
        className="flex text-[var(--primary)] relative min-[768px]:text-[20px] min-[1440px]:text-[28px]"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <p className="text-[var(--primary)]">{name}</p>
        <span className="text-[var(--primary)]/50 ">▼</span>
      </button>
      {menuOpen ? (
        <ul className="absolute right-0 z-[5] ">
          <li>
            <button
              className="w-30 min-[768px]:w-34 bg-[var(--surface)] px-2 py-1 min-[1440px]:w-38 min-[1440px]:px-3 min-[1440px]:py-2 flex focus:bg-[var(--primary)] hover:bg-[var(--primary)] gap-1 items-center "
              onClick={() => logOut()}
            >
              {isLoading ? (
                <div className="loading loading-spinner loading-sm"></div>
              ) : (
                <>
                  <LogOut size={16} />
                  {language === "eng"
                    ? "Logout"
                    : language === "deu"
                    ? "Abmelden"
                    : "wyloguj się"}
                </>
              )}
            </button>
          </li>
          <li>
            <button
              className="w-30 min-[768px]:w-34 bg-[var(--surface)] px-2 py-1 min-[1440px]:w-38 min-[1440px]:px-3 min-[1440px]:py-2 flex focus:bg-[var(--primary)] hover:bg-[var(--primary)] gap-1 items-center"
              onClick={() => del()}
            >
              {delLoading ? (
                <div className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  <Trash2 size={16} />
                  {language === "eng"
                    ? "Delete"
                    : language === "deu"
                    ? "Löschen"
                    : "Usunąć"}
                </>
              )}
            </button>
          </li>
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

export default UserButton;

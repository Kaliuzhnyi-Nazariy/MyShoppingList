import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { logout } from "../../../Query/user";
import { LogOut, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserButton = ({ name }: { name: string }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useNavigate();

  const { mutate: logOut, isPending: isLoading } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess() {
      router("/signin");
    },
  });

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
              className="w-20 min-[768px]:w-24 bg-[var(--surface)] px-2 py-1 min-[1440px]:w-28 min-[1440px]:px-3 min-[1440px]:py-2 flex focus:bg-[var(--primary)] hover:bg-[var(--primary)] gap-1 items-center "
              onClick={() => logOut()}
            >
              {isLoading ? (
                <div className="loading loading-spinner loading-sm"></div>
              ) : (
                <>
                  <LogOut size={16} /> Logout
                </>
              )}
            </button>
          </li>
          <li>
            <button className="w-20 min-[768px]:w-24 bg-[var(--surface)] px-2 py-1 min-[1440px]:w-28 min-[1440px]:px-3 min-[1440px]:py-2 flex focus:bg-[var(--primary)] hover:bg-[var(--primary)] gap-1 items-center">
              <Trash2 size={16} /> Delete
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

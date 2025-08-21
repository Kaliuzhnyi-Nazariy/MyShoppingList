import { createContext } from "react";

interface UserContext {
  name: string | null;
  isLoggedIn: boolean;
  setName: React.Dispatch<React.SetStateAction<string>>;
  seIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const userContext = createContext<UserContext | null>(null);

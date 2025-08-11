import { createContext } from "react";

export type Languages = "eng" | "pl" | "deu";
interface LangContext {
  language: Languages;
  setLanguage: React.Dispatch<React.SetStateAction<Languages>>;
}

export const languageContext = createContext<LangContext | undefined>(
  undefined
);

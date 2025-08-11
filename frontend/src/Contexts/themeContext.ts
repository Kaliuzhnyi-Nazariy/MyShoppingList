import React, { createContext } from "react";

export type ThemeVariants = "light" | "dark" | "colorful";

interface MyContextType {
  theme: ThemeVariants;
  setTheme: React.Dispatch<React.SetStateAction<ThemeVariants>>;
}

export const themeContext = createContext<MyContextType | undefined>(undefined);

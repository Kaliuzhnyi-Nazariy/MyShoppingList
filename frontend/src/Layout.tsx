import { useEffect, useState } from "react";
import { themeContext } from "./Contexts/themeContext";
import { languageContext, type Languages } from "./Contexts/languageContext";
import UserLayout from "./UserLayout/UserLayout";

type ThemeType = "light" | "dark" | "colorful";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>("light");
  const [language, setLanguage] = useState<Languages>("eng");

  useEffect(() => {
    const chosenLang = localStorage.getItem("lang");
    if (chosenLang) setLanguage(chosenLang as Languages);
    const chosenTheme = localStorage.getItem("theme");
    if (chosenTheme) setTheme(chosenTheme as ThemeType);
  }, []);

  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      <languageContext.Provider value={{ language, setLanguage }}>
        <UserLayout>{children}</UserLayout>
      </languageContext.Provider>
    </themeContext.Provider>
  );
};

export default Layout;

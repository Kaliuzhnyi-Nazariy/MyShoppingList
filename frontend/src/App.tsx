import { useContext } from "react";
import Header from "./components/Header/Header";
import { themeContext } from "./Contexts/themeContext";
import ListOfGoods from "./components/Main/ListOfGoods";

function App() {
  const chosenTheme = useContext(themeContext);
  return (
    <div
      className="min-h-screen w-full bg-[var(--background)] flex flex-col"
      data-theme={chosenTheme?.theme}
    >
      {/* <div
      className="min-h-screen w-full bg-[var(--background)]"
      data-theme={"dark"}
    > */}
      <Header />
      <ListOfGoods />
    </div>
  );
}

export default App;

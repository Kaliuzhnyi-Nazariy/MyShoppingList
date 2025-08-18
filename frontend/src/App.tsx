import { useContext } from "react";
import { themeContext } from "./Contexts/themeContext";
import Signup from "./Auth/Signup/Signup";
import Header from "./components/Header/Header";
import ListOfGoods from "./components/Main/ListOfGoods";

function App() {
  const chosenTheme = useContext(themeContext);
  return (
    <div
      className="min-h-screen w-full bg-[var(--background)] flex flex-col"
      data-theme={chosenTheme?.theme}
    >
      {/* <Header />
      <ListOfGoods /> */}
      <Signup />
    </div>
  );
}

export default App;

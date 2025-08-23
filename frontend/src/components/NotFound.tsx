import { useContext } from "react";
import { Link } from "react-router-dom";
import { languageContext } from "../Contexts/languageContext";

const NotFound = () => {
  const lContext = useContext(languageContext);

  if (!lContext) return "LContext don`t work";

  const { language } = lContext;

  const message = () => {
    switch (language) {
      case "pl":
        return "Niestety, strona nie została znaleziona";
      case "deu":
        return "Leider konnte die Seite nicht gefunden werden";
      default:
        return "Unfortunately, page not found";
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-4 min-[768px]:gap-6 min-[1440px]:gap-8 ">
      <p className="text-2xl min-[768px]:text-3xl min-[1440px]:text-4xl ">
        {message()}
      </p>
      <Link
        to="/"
        className="bg-[var(--accent)] min-w-[144px] px-6 py-1 rounded-[10px] border border-transparent hover:border-[var(--accent)] transition-colors hover:bg-transparent focus:outline focus:outline-[var(--accent)] focus:bg-transparent duration-300 min-[768px]:text-2xl min-[1440px]:text-[18px] min-[1440px]:px-0 uppercase text-center flex justify-center items-center"
      >
        Go home
      </Link>
    </div>
  );
};

export default NotFound;

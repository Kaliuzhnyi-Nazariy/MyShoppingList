import ChoseTheme from "./ChoseTheme";
import ChoseLanguage from "./ChoseLanguage";

const Header = () => {
  return (
    <header className="flex w-full justify-between px-5 border-b border-[var(--primary)]/50 min-h-[52px] items-center flex-0 ">
      <h1 className="text-[18px] text-[var(--primary)] ">MyShoppingList</h1>
      <ul className="flex gap-2.5">
        <li>
          <ChoseTheme />
        </li>
        <li>
          <ChoseLanguage />
        </li>
      </ul>
    </header>
  );
};

export default Header;

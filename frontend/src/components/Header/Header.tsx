import ChoseTheme from "./ChoseTheme";
import ChoseLanguage from "./ChoseLanguage";

const Header = () => {
  return (
    <header className="flex w-full justify-between px-5 border-b border-[var(--primary)]/50 min-h-[52px] items-center flex-0 min-[768px]:min-h-[114px] min-[768px]:px-10  min-[1440px]:min-h-[128px] min-[1440px]:px-20 ">
      <h1 className="text-[18px] text-[var(--primary)] min-[768px]:text-[32px] min-[1440px]:text-4xl ">
        MyShoppingList
      </h1>
      <ul className="flex gap-2.5 min-[768px]:gap-4 min-[1440px]:gap-10 ">
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

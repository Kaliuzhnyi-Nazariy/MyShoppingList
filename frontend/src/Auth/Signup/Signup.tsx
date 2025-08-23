import { Link } from "react-router-dom";
import Form from "./Form";

const Signup = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-[var(--text)] ">
      <h1 className="text-[36px] min-[768px]:text-5xl min-[1440px]:text-[56px] ">
        MyShoppingList
      </h1>
      <Form />

      <Link
        to="/signin"
        className="text-[10px] my-4 min-[768px]:text-[18px] min-[768px]:mt-5 min-[1440px]:mt-8 "
      >
        Do you have an account? SIGN IN!
      </Link>
    </div>
  );
};

export default Signup;

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { addUser } from "../../Query/user";
import type { AddUser } from "../../types";
// import { useNavigate } from "react-router-dom";
import InputAuth from "../Components/InputAuth";
import { Eye, EyeClosed } from "lucide-react";

const Form = () => {
  // const router = useNavigate();

  const [formData, setData] = useState<AddUser>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const setFormInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearForm = () => {
    setData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: AddUser) => addUser(formData),
    onSuccess() {
      clearForm();
      // router("/");
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

  // const onSubmit =

  return (
    <form className="flex flex-col gap-4 mt-10">
      <InputAuth
        label="Username"
        placeholder="Jhon Doe"
        name="name"
        value={formData.name}
        onChange={setFormInfo}
      />
      <InputAuth
        label="Email"
        placeholder="example@mail.com"
        name="email"
        type="email"
        value={formData.email}
        onChange={setFormInfo}
      />
      <div className="relative">
        <InputAuth
          label="Password"
          placeholder="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={setFormInfo}
        />
        <button
          type="button"
          className="absolute right-1 bottom-1/6"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            setShowPassword(!showPassword);
          }}
        >
          {showPassword ? <EyeClosed size={12} /> : <Eye size={12} />}
        </button>
      </div>
      <div className="relative">
        <InputAuth
          label="Confirm password"
          placeholder="Repeat your password"
          name="confirmPassword"
          type={showConfPassword ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={setFormInfo}
        />
        <button
          type="button"
          className="absolute right-1 bottom-1/6"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            setShowConfPassword(!showConfPassword);
          }}
        >
          {showConfPassword ? <EyeClosed size={12} /> : <Eye size={12} />}
        </button>
      </div>
      <button
        className="bg-[var(--accent)] px-6 py-1 rounded-[10px] border border-transparent hover:border-[var(--accent)] transition-colors hover:bg-transparent focus:outline focus:outline-[var(--accent)] focus:bg-transparent duration-300 mt-1 disabled:opacity-50 min-[768px]:mt-2 min-[768px]:text-2xl min-[768px]:h-12 min-[768px]:w-[310px] min-[1440px]:col-span-2 min-[1440px]:justify-self-center min-[1440px]:self-center min-[1440px]:m-0 min-[1440px]:row-4 min-[1440px]:w-[224px] min-[1440px]:h-[36px] min-[1440px]:text-[18px] min-[1440px]:px-0 uppercase"
        disabled={
          !formData.email ||
          !formData.name ||
          !formData.password ||
          !formData.confirmPassword
        }
      >
        Sign up
      </button>{" "}
    </form>
  );
};

export default Form;

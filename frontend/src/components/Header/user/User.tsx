// import { useQuery } from "@tanstack/react-query";
// import { getUser } from "../../../Query/user";
import UserButton from "./UserButton";
import { useContext } from "react";
import { userContext } from "../../../Contexts/userContext";

const User = () => {
  const uContext = useContext(userContext);

  if (!uContext)
    return "something should work, but not work I mean reaqt query layout";

  const { name } = uContext;

  // const { data, isPending } = useQuery({
  //   queryKey: ["userdata"],
  //   queryFn: getUser,
  // });

  // console.log(data);
  return (
    <div className="relative">
      {<UserButton name={name || "none"} />}
      {/* {isPending ? "Loading" : data ? <UserButton name={data.name} /> : "Non"} */}
      {/* none */}
    </div>
  );
};

export default User;

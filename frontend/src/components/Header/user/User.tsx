import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../../Query/user";
import UserButton from "./UserButton";

const User = () => {
  const { data, isPending } = useQuery({
    queryKey: ["userdata"],
    queryFn: getUser,
  });

  console.log(data);
  return (
    <div className="relative">
      {isPending ? "Loading" : data ? <UserButton name={data.name} /> : "Non"}
    </div>
  );
};

export default User;

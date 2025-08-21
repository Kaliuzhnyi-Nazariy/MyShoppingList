import { userContext } from "../Contexts/userContext";
import { useState } from "react";
const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <userContext.Provider
      value={{
        name,
        isLoggedIn: isLoggedIn,
        setName,
        seIsLoggedIn: setIsLoggedIn,
      }}
    >
      {children}
    </userContext.Provider>
  );

  // return (
  //   <userContext.Provider
  //     value={{
  //       user: data ?? null,
  //       isLoading: isPending,
  //       refetchUser: refetch,
  //     }}
  //   >
  //     {children}
  //   </userContext.Provider>
  // );
};

export default UserLayout;

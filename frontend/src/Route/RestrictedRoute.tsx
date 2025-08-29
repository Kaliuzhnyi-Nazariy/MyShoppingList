import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { getUser } from "../Query/user";
import { useContext, useEffect } from "react";
import { userContext } from "../Contexts/userContext";

const RestrictedRoute = ({
  Component,
  redirectTo = "/",
}: {
  Component: React.ReactNode;
  redirectTo?: string;
}) => {
  const uContext = useContext(userContext);

  const { data = [], isPending } = useQuery({
    queryKey: ["getUserData"],
    queryFn: getUser,
    retry: false,
    refetchOnMount: true,
    throwOnError: false,
    refetchOnWindowFocus: false,
  });

  // if (isPending) return "loading";

  // if (!uContext)
  //   return "something should work, but not work I mean reaqt query layout";

  // if (data) {
  //   uContext.setName(data.name);
  // }

  useEffect(() => {
    if (data && uContext) {
      uContext.setName(data.name);
    }
  }, [data, uContext]);
  if (isPending) return "loading";

  return data ? <Navigate to={redirectTo} /> : Component;
};

export default RestrictedRoute;

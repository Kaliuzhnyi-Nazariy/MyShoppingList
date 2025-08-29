import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { getUser } from "../Query/user";
import { useContext, useEffect } from "react";
import { userContext } from "../Contexts/userContext";

// interface RouteProps {
//   Component: React.ReactNode;
//   // Component: React.ComponentType;
//   redirectTo?: string;
// }

const PrivateRoute = ({
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

  // if (!uContext)
  //   return "something should work, but not work I mean reaqt query layout";

  // const { setName } = uContext;

  // if (data) {
  //   setName(data.name);
  // }

  useEffect(() => {
    if (data && uContext) {
      uContext.setName(data.name);
    }
  }, [data, uContext]);
  if (isPending) return "loading";

  return data ? Component : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;

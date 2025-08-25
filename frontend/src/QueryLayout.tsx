// import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const QueryLayout = ({ children }: { children: JSX.Element }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryLayout;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Layout from "./Layout.tsx";
import QueryLayout from "./QueryLayout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Layout>
      <QueryLayout>
        <App />
      </QueryLayout>
    </Layout>
  </StrictMode>
);

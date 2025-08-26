import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import Layout from "./Layout";
import QueryLayout from "./QueryLayout";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryLayout>
        <Layout>
          <App />
        </Layout>
      </QueryLayout>
    </BrowserRouter>
  </StrictMode>
);

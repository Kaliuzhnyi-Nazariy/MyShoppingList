import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Layout from "./Layout.tsx";
import QueryLayout from "./QueryLayout.tsx";
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

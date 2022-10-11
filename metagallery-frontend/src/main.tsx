import "./index.css";
import "react-toastify/dist/ReactToastify.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./app/plugins/axios";
import App from "./app/App";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./app/constants/queryClient";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

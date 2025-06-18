import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./fonts.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import ThemeContextComponent from "./components/modules/Theme/ThemeContextComponent.tsx";
// import React from "react";

const root = document.getElementById("root");

const queryClient = new QueryClient();

if (root) {
  ReactDOM.createRoot(root).render(
    // <React.StrictMode>
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeContextComponent>
          <App />
        </ThemeContextComponent>
      </QueryClientProvider>
      <Toaster position="top-right" />
      <ReactQueryDevtools
        initialIsOpen={false}
        client={queryClient}
        buttonPosition="bottom-left"
      />
    </>,
    // </React.StrictMode>,
  );
}

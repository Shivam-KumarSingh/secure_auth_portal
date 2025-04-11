import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { 
  createBrowserRouter, 
  RouterProvider,
  createRoutesFromElements,
  Route
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

// Create router without future flags
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/*" element={<App />} />
  )
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
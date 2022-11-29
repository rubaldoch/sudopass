import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Login } from "./routes/Login/login";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import Dashboard from "./routes/dashboard/dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "dashboard/",
    element: <Dashboard />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();

// SudoPass must run on 360x550 px dimensions
root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN ?? ""}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID ?? ""}
    redirectUri={window.location.origin}
  >
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </QueryClientProvider>
  </Auth0Provider>
);

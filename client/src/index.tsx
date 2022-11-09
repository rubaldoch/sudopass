import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./routes/register";
import { Login } from "./routes/Login/login";
import { Auth0Provider } from "@auth0/auth0-react";
import Dashboard from "./routes/dashboard/dashboard";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "dashboard/",
    element: <Dashboard />,
  },
  {
    path: "register/",
    element: <Register />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// SudoPass must run on 360x550 px dimensions
root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN ?? ""}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID ?? ""}
    redirectUri={window.location.origin}
  >
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Auth0Provider>
);

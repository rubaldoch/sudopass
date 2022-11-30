import React, { FC, useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Login } from "./routes/Login/login";
import { Dashboard } from "./routes/Dashboard/dashboard";
import { Auth0Provider } from "@auth0/auth0-react";
import { createContext } from "react";
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
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

export interface IApplicatonContext {
  secret: string;
  setSecret: (secret: string) => void;
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
}

export const ApplicationContext = createContext<IApplicatonContext>({
  accessToken: "",
  setAccessToken: () => {},
  secret: "",
  setSecret: () => {},
});

const queryClient = new QueryClient();

const App: FC = () => {
  const [secret, setSecret] = useState("");
  const [accessToken, setAccessToken] = useState("");
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN ?? ""}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID ?? ""}
      redirectUri={window.location.origin}
    >
      <ApplicationContext.Provider value={{ accessToken, setAccessToken, secret, setSecret }}>
        <QueryClientProvider client={queryClient}>
          <React.StrictMode>
            <RouterProvider router={router} />
          </React.StrictMode>
        </QueryClientProvider>
      </ApplicationContext.Provider>
    </Auth0Provider>
  );
};

// SudoPass must run on 450x650 px dimensions
root.render(<App />);

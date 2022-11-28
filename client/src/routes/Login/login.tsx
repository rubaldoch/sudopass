import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SudoPassLogo } from "../../components/Icons/sudoPassLogo";
import { createUser, fetchDoesUserExist } from "./loginApi";
import "./login.css";

export const Login: FC = () => {
  const {
    loginWithRedirect,
    isAuthenticated,
    isLoading: isAuthLoading,
    user,
  } = useAuth0();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [inputPassword, setInputPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { data: doesUserExist, isLoading: isUserLoading } = useQuery<boolean>(
    ["user", user?.email],
    () => fetchDoesUserExist(user?.email ?? ""),
    { enabled: isAuthenticated }
  );
  const createUserMutation = useMutation(createUser, {
    onSuccess: () => {
      queryClient.refetchQueries(["user", user?.email]);
      alert("User created successfully");
    },
  });

  const handleOnSignInWithGooglePressed = () => {
    loginWithRedirect();
  };

  const handleOnSignInWithMasterPasswordPressed = () => {
    if (inputPassword !== confirmPassword && !doesUserExist) {
      alert("Passwords do not match");
      return;
    }

    if (doesUserExist) {
      // TODO validate master password
      navigate("/dashboard");
    } else {
      createUserMutation.mutate({
        email: user?.email ?? "",
        password: inputPassword,
        alias: user?.name ?? "",
      });
    }
  };

  const isLoading = isAuthLoading || isUserLoading;

  return (
    <div className="login-container">
      <SudoPassLogo />
      {!isAuthenticated && !isLoading && (
        <button onClick={handleOnSignInWithGooglePressed}>
          Login with Google
        </button>
      )}
      {isAuthenticated && !isLoading && doesUserExist && (
        <div className="master-password-container">
          <input
            type="password"
            placeholder="Input Password"
            onChange={(e) => setInputPassword(e.target.value)}
          />
          <button onClick={handleOnSignInWithMasterPasswordPressed}>
            Log In
          </button>
        </div>
      )}
      {isAuthenticated && !isLoading && !doesUserExist && (
        <div className="master-password-container">
          <input
            type="password"
            placeholder="Input Password"
            onChange={(e) => setInputPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span>Please remember to store your password in a safe place!</span>
          <span>If you forget your password, you will lose all your data.</span>
          <button onClick={handleOnSignInWithMasterPasswordPressed}>
            Sign Up
          </button>
        </div>
      )}
      {isLoading && <span>Loading...</span>}
    </div>
  );
};

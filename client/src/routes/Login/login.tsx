import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SudoPassLogo } from "../../components/Icons/sudoPassLogo";
import { createUser, fetchDoesUserExist } from "./loginApi";
import PasswordChecklist from "react-password-checklist";
import "./login.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

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
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleOnModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleOnModalClose = () => {
    setIsModalOpen(false);
  };

  const isLoading = isAuthLoading || isUserLoading;
  return (
    <div className="login-container">
      <SudoPassLogo />
      {!isAuthenticated && (
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
          <PasswordChecklist
            rules={["minLength", "specialChar", "number", "capital", "match"]}
            minLength={5}
            value={inputPassword}
            valueAgain={confirmPassword}
            onChange={(isValid) => {
              setIsPasswordValid(isValid);
            }}
          />

          <button disabled={!isPasswordValid} onClick={handleOnModalOpen}>
            Sign Up
          </button>
          <Dialog
            open={isModalOpen}
            onClose={handleOnModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Please take note"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Remember to store your password in a safe place! If you forget
                your master password, you will lose all your data.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleOnModalClose}>Disagree</Button>
              <Button
                onClick={handleOnSignInWithMasterPasswordPressed}
                autoFocus
              >
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
      {isAuthenticated && isLoading && <span>Loading...</span>}
    </div>
  );
};

import { useAuth0 } from "@auth0/auth0-react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { SudoPassLogo } from "../../components/Icons/sudoPassLogo";
import "./login.css";

export const Login: FC = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  const handleOnSignInWithGooglePressed = () => {
    loginWithRedirect();
  };

  const handleOnSignInWithMasterPasswordPressed = () => {
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <SudoPassLogo />
      {!isAuthenticated && !isLoading && (
        <button onClick={handleOnSignInWithGooglePressed}>
          Login with Google
        </button>
      )}
      {isAuthenticated && !isLoading && (
        <div className="master-password-container">
          <input type="password" />
          <button onClick={handleOnSignInWithMasterPasswordPressed}>
            Log in
          </button>
        </div>
      )}
      {isLoading && <span>Loading...</span>}
    </div>
  );
};

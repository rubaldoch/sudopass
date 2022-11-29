import { FC } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import "./header.css";
import { SudoPassMiniLogo } from "../Icons/sudoPassMiniLogo";
import { useAuth0 } from "@auth0/auth0-react";

export const Header: FC = () => {
  const { logout } = useAuth0();

  return (
    <div className="header">
      <SudoPassMiniLogo />
      <div className="profile-button">
        <LogoutIcon fontSize="medium" onClick={() => logout()} />
      </div>
    </div>
  );
};

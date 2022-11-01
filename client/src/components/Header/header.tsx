import { FC } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./header.css";
import { SudoPassMiniLogo } from "../Icons/sudoPassMiniLogo";

export const Header: FC = () => {
  return (
    <div className="header">
      <SudoPassMiniLogo />
      <div className="profile-button">
        <AccountCircleIcon fontSize="large" />
      </div>
    </div>
  );
};

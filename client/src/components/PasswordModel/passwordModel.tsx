import { FC, useContext, useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import CreateIcon from "@mui/icons-material/Create";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import "./passwordModel.css";
import { PasswordDto } from "../../interfaces/passwordDto";
import { decrypt } from "../../config/utils";
import { ApplicationContext } from "../..";
interface IPasswordModelProps {
  password: PasswordDto;
  handleOnEdit: (password: PasswordDto) => void;
}

export const PasswordModel: FC<IPasswordModelProps> = ({
  password,
  handleOnEdit,
}) => {
  const context = useContext(ApplicationContext);

  const [passwordValue, setPasswordValue] = useState("");
  const [copyMessage, setCopyMessage] = useState("Copy Password");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    password: encryptedPassword,
    domain,
    domainAlias: alias,
    iconUrl,
  } = password;

  useEffect(() => {
    setPasswordValue(decrypt(encryptedPassword, context.secret));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  const handleShowPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleOnCopy = () => {
    navigator.clipboard.writeText(passwordValue);
    setCopyMessage("Copied!");
    setTimeout(() => {
      setCopyMessage("Copy Password");
    }, 2000);
  };

  return (
    <div className="password-model">
      <div className="password-info">
        {iconUrl && (
          <div className="password-icon">
            <img src={iconUrl} alt="icon" />
          </div>
        )}
        <div className="password-info-text">
          <span>{alias}</span>
          <span className="password-info-text-domain">{domain}</span>
        </div>
        <div className="password-secret">
          <Tooltip title={copyMessage} placement="top">
            {isPasswordVisible ? (
              <span className="password-secret-show">{passwordValue}</span>
            ) : (
              <input
                type="password"
                className="password-secret-hide noselect"
                value="mysecret"
                readOnly
                onClick={() => handleOnCopy()}
              />
            )}
          </Tooltip>
          <ContentCopyIcon sx={{ fontSize: 15 }} />
        </div>
        <div className="password-buttons">
          <Tooltip title="Edit Password" placement="right">
            <div
              className="password-button"
              onClick={() => handleOnEdit(password)}
            >
              <CreateIcon fontSize="small" />
            </div>
          </Tooltip>
          <Tooltip title="View Password" placement="right">
            <div
              className="password-button"
              onClick={() => handleShowPassword()}
            >
              <VisibilityIcon fontSize="small" />
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

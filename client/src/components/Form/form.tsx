import { Tooltip } from "@mui/material";
import { FC, useState } from "react";
import { PasswordDto } from "../../interfaces/passwordDto";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { generate } from "@wcj/generate-password";
import "./form.css";

interface IFormProps {
  password: PasswordDto | null;
  formType: "create" | "edit" | "none";
  handleOnClose: () => void;
  handleOnSave: (
    password: PasswordDto,
    type: "create" | "edit" | "none"
  ) => void;
  handleOnDelete: (password: PasswordDto) => void;
}

export const Form: FC<IFormProps> = ({
  password,
  handleOnSave,
  handleOnClose,
  handleOnDelete,
  formType,
}) => {
  const [idValue] = useState(password?.id || "");
  const [passwordValue, setPasswordValue] = useState(password?.password || "");
  const [domainValue, setDomainValue] = useState(password?.domain || "");
  const [aliasValue, setAliasValue] = useState(password?.alias || "");
  const [iconUrlValue, setIconUrlValue] = useState(password?.iconUrl || "");

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleOnSave(
      {
        id: idValue,
        password: passwordValue,
        domain: domainValue,
        alias: aliasValue,
        iconUrl: iconUrlValue,
      } as PasswordDto,
      formType
    );
  };

  const generatePassword = () => {
    setPasswordValue(
      generate({
        length: 15,
        numeric: true,
        special: true,
        upperCase: true,
        lowerCase: true,
      })
    );
  };

  return (
    <div className="form-container">
      <div className="form-header">
        {formType === "create" && <span>Create Password</span>}
        {formType === "edit" && <span>Edit Password</span>}
        <button className="form-close-button" onClick={handleOnClose}>
          X
        </button>
      </div>
      <form className="form" onSubmit={handleOnSubmit}>
        <div className="form-input">
          <label htmlFor="password">Password</label>
          <div className="password-input">
            <input
              type="password"
              id="password"
              value={passwordValue}
              onChange={(event) => setPasswordValue(event.target.value)}
            />
            <Tooltip title="Generate Password" placement="top">
              <div className="password-button" onClick={generatePassword}>
                <AutoAwesomeIcon fontSize="small" />
              </div>
            </Tooltip>
          </div>
        </div>
        <div className="form-input">
          <label htmlFor="domain">Domain</label>
          <input
            type="text"
            id="domain"
            value={domainValue}
            onChange={(event) => setDomainValue(event.target.value)}
          />
        </div>
        <div className="form-input">
          <label htmlFor="alias">Alias</label>
          <input
            type="text"
            id="alias"
            value={aliasValue}
            onChange={(event) => setAliasValue(event.target.value)}
          />
        </div>
        <div className="form-input">
          <label htmlFor="iconUrl">Icon URL</label>
          <input
            type="text"
            id="iconUrl"
            value={iconUrlValue}
            onChange={(event) => setIconUrlValue(event.target.value)}
          />
        </div>
        <div className="form-buttons">
          {formType === "edit" && (
            <button onClick={() => handleOnDelete(password as PasswordDto)}>
              Delete
            </button>
          )}
          <button type="submit">
            {formType === "edit" ? "Save" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

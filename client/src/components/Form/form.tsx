import { FC, useState } from "react";
import { PasswordDto } from "../../interfaces/passwordDto";
import "./form.css";

interface IFormProps {
  password: PasswordDto | null;
  handleOnSave: (password: PasswordDto) => void;
  handleOnClose: () => void;
  formType: "edit" | "create" | "none";
}

export const Form: FC<IFormProps> = ({
  password,
  handleOnSave,
  handleOnClose,
  formType,
}) => {
  const [passwordValue, setPasswordValue] = useState(password?.password || "");
  const [domainValue, setDomainValue] = useState(password?.domain || "");
  const [aliasValue, setAliasValue] = useState(password?.alias || "");
  const [iconUrlValue, setIconUrlValue] = useState(password?.iconUrl || "");

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleOnSave({
      password: passwordValue,
      domain: domainValue,
      alias: aliasValue,
      iconUrl: iconUrlValue,
    } as PasswordDto);
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
          <input
            type="password"
            id="password"
            value={passwordValue}
            onChange={(event) => setPasswordValue(event.target.value)}
          />
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
          <button type="submit">
            {formType === "edit" ? "Save" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

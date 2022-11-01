import { useState } from "react";
import "./App.css";
import { CreateButton } from "./components/CreateButton/createButton";
import { Form } from "./components/Form/form";
import { Header } from "./components/Header/header";
import { PasswordModel } from "./components/PasswordModel/passwordModel";
import { PasswordDto } from "./interfaces/passwordDto";

const fakePasswords: PasswordDto[] = [
  {
    password: "passwordasdsadasdasdasdadd",
    domain: "google.com",
    alias: "google",
  },
  {
    password: "password123456",
    domain: "facebook.com",
    alias: "mi cuenta :D", // Límite de caracteres es 12
    iconUrl: "https://www.facebook.com/images/fb_icon_325x325.png",
  },
];

function App() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedPassword, setSelectedPassword] = useState<PasswordDto | null>(
    null
  );

  const handleOnEditPressed = (password: PasswordDto) => {
    setIsFormVisible(true);
    setSelectedPassword(password);
  };

  const handleOnCreatePressed = () => {
    setIsFormVisible(true);
    setSelectedPassword(null);
  };

  const handleOnFormSave = (password: PasswordDto) => {
    setIsFormVisible(false);
    setSelectedPassword(null);
  };

  const handleOnFormClose = () => {
    setIsFormVisible(false);
    setSelectedPassword(null);
  };

  const renderForm = () => {
    if (!isFormVisible) return;
    return (
      <Form
        password={selectedPassword}
        handleOnSave={handleOnFormSave}
        handleOnClose={handleOnFormClose}
        formType={selectedPassword ? "edit" : "create"}
      />
    );
  };

  const renderPasswords = () => {
    if (isFormVisible) return;

    return (
      <>
        <CreateButton handleOnCreate={handleOnCreatePressed} />
        {fakePasswords.map((passwordDto) => (
          <PasswordModel
            password={passwordDto}
            handleOnEdit={handleOnEditPressed}
            key={passwordDto.domain}
          />
        ))}
      </>
    );
  };

  return (
    <div className="App">
      <Header />
      {renderForm()}
      {renderPasswords()}
    </div>
  );
}

export default App;

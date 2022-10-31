import { useState } from "react";
import "./App.css";
import { CreateButton } from "./components/CreateButton/createButton";
import { Form } from "./components/Form/form";
import { Header } from "./components/Header/header";
import { PasswordModel } from "./components/PasswordModel/passwordModel";
import { PasswordDto } from "./interfaces/passwordDto";

const fakePasswords: PasswordDto[] = [
  {
    password: "password",
    domain: "google.com",
    alias: "google",
    iconUrl:
      "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
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
    console.log("Editando", password);
    setIsFormVisible(true);
    setSelectedPassword(password);
  };

  const handleOnCreatePressed = () => {
    console.log("Creando");
    setIsFormVisible(true);
    setSelectedPassword(null);
  };

  const handleOnFormSave = (password: PasswordDto) => {
    console.log("Form submitted", password);
    setIsFormVisible(false);
    setSelectedPassword(null);
  };

  const handleOnFormClose = () => {
    console.log("Form closed");
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
        {fakePasswords.map((password) => (
          <PasswordModel
            password={password}
            handleOnEdit={handleOnEditPressed}
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

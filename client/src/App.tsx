import { useState } from "react";
import "./App.css";
import { CreateButton } from "./components/CreateButton/createButton";
import { Form } from "./components/Form/form";
import { Header } from "./components/Header/header";
import { PasswordModel } from "./components/PasswordModel/passwordModel";
import { PasswordDto } from "./interfaces/passwordDto";

const fakePasswords: PasswordDto[] = [
  {
    id: "1",
    password: "passwordasdsadasdasdasdadd",
    domain: "google.com",
    alias: "google",
  },
  {
    id: "2",
    password: "password123456",
    domain: "facebook.com",
    alias: "mi cuenta :D",
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

  const handleOnFormSave = (
    password: PasswordDto,
    type: "create" | "edit" | "none"
  ) => {
    setIsFormVisible(false);
    setSelectedPassword(null);
    if (type === "create") {
      fakePasswords.push(password);
    } else {
      const index = fakePasswords.findIndex((p) => p.id === password.id);
      fakePasswords[index] = password;
    }
  };

  const handleOnFormDelete = (password: PasswordDto) => {
    setIsFormVisible(false);
    setSelectedPassword(null);
    const index = fakePasswords.findIndex((p) => p.id === password.id);
    fakePasswords.splice(index, 1);
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
        handleOnDelete={handleOnFormDelete}
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
            key={passwordDto.id}
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

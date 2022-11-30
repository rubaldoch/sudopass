import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FC, useState } from "react";
import { CreateButton } from "../../components/CreateButton/createButton";
import { Form } from "../../components/Form/form";
import { Header } from "../../components/Header/header";
import { PasswordModel } from "../../components/PasswordModel/passwordModel";
import { PasswordDto } from "../../interfaces/passwordDto";
import "./dashboard.css";
import {
  createPassword,
  deletePassword,
  fetchAllPasswords,
  updatePassword,
} from "./dashboardApi";

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

export const Dashboard: FC = () => {
  const queryClient = useQueryClient();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedPassword, setSelectedPassword] = useState<PasswordDto | null>(
    null
  );

  const { data, isLoading } = useQuery<PasswordDto[]>(["passwords"], () =>
    fetchAllPasswords()
  );

  const createPasswordMutation = useMutation(createPassword, {
    onSuccess: () => {
      queryClient.refetchQueries(["passwords"]);
    },
  });

  const updatePasswordMutation = useMutation(updatePassword, {
    onSuccess: () => {
      queryClient.refetchQueries(["passwords"]);
    },
  });

  const deletePasswordMutation = useMutation(deletePassword, {
    onSuccess: () => {
      queryClient.refetchQueries(["passwords"]);
    },
  });

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
      createPasswordMutation.mutate(password);
    } else {
      updatePasswordMutation.mutate(password);
    }
  };

  const handleOnFormDelete = (password: PasswordDto) => {
    setIsFormVisible(false);
    setSelectedPassword(null);
    deletePasswordMutation.mutate(password.id);
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
        {data &&
          !isLoading &&
          data.map((passwordDto) => (
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
    <div className="dashboard">
      <Header />
      {renderForm()}
      {renderPasswords()}
    </div>
  );
};

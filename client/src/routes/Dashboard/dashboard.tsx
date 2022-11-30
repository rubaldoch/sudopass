import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FC, useContext, useState } from "react";
import { ApplicationContext } from "../..";
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

export const Dashboard: FC = () => {
  const queryClient = useQueryClient();
  const context = useContext(ApplicationContext);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedPassword, setSelectedPassword] = useState<PasswordDto | null>(
    null
  );

  const { data, isLoading } = useQuery<PasswordDto[]>(
    ["passwords"],
    () => fetchAllPasswords(context.accessToken),
    {
      enabled: !!context.accessToken,
    }
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
      createPasswordMutation.mutate({
        body: password,
        access_token: context.accessToken,
        secret: context.secret,
      });
    } else {
      updatePasswordMutation.mutate({
        body: password,
        access_token: context.accessToken,
        secret: context.secret,
      });
    }
  };

  const handleOnFormDelete = (password: PasswordDto) => {
    setIsFormVisible(false);
    setSelectedPassword(null);
    deletePasswordMutation.mutate({
      id: password.id,
      access_token: context.accessToken,
    });
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

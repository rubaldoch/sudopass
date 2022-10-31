import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Tooltip } from "@mui/material";
import { FC } from "react";
import "./createButton.css";

interface ICreateButtonProps {
  handleOnCreate: () => void;
}

export const CreateButton: FC<ICreateButtonProps> = ({ handleOnCreate }) => {
  return (
    <Tooltip title="Create Password" placement="top">
      <div className="create-button" onClick={handleOnCreate}>
        <AddCircleIcon />
      </div>
    </Tooltip>
  );
};

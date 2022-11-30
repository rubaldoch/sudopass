import axios from "axios";
import { API_SERVER } from "../../config/constant";
import { PasswordDto } from "../../interfaces/passwordDto";

export const fetchAllPasswords = async (access_token: string) => {
  const res = await axios.get(API_SERVER + "/credential", {
    headers: {
      Authorization: access_token,
    },
  });
  return res.data;
};

export const createPassword = async (vars: {
  body: PasswordDto;
  access_token: string;
}) => {
  const res = await axios.post(API_SERVER + "/credential", vars.body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: vars.access_token,
    },
  });
  return res.data;
};

export const updatePassword = async (vars: {
  body: PasswordDto;
  access_token: string;
}) => {
  const res = await axios.put(
    API_SERVER + "/credential/" + vars.body._id,
    vars.body,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: vars.access_token,
      },
    }
  );
  return res.data;
};

export const deletePassword = async (vars: {
  id: string;
  access_token: string;
}) => {
  const res = await axios.delete(API_SERVER + "/credential/" + vars.id, {
    headers: {
      Authorization: vars.access_token,
    },
  });
  return res.data;
};

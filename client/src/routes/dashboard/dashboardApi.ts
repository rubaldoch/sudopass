import axios from "axios";
import { API_SERVER } from "../../config/constant";
import { PasswordDto } from "../../interfaces/passwordDto";

export const fetchAllPasswords = async () => {
  const res = await axios.get(API_SERVER + "/credential");
  return res.data;
};

export const createPassword = async (body: PasswordDto) => {
  const res = await axios.post(API_SERVER + "/credential", body);
  return res.data;
};

export const updatePassword = async (body: PasswordDto) => {
  const res = await axios.put(API_SERVER + "/credential/" + body.id, body);
  return res.data;
};

export const deletePassword = async (id: string) => {
  const res = await axios.delete(API_SERVER + "/credential/" + id);
  return res.data;
};

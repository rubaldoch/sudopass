import axios from "axios";
import { API_SERVER } from "../../config/constant";

export const fetchDoesUserExist = async (email: string) => {
  const res = await axios.get(API_SERVER + "/auth/user-exist/" + email);
  return res.data;
};

export const createUser = async (body: {
  email: string;
  alias: string;
  password: string;
}) => {
  const res = await axios.post(API_SERVER + "/auth/signup", body);
  return res.data;
};

export const loginUser = async (body: {
  email: string;
  password: string;
}) => {
  const res = await axios.post(API_SERVER + "/auth/login", body);
  return res.data;
};

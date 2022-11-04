import axios from "./index";

class AuthApi {
  static Login = (data: any) => {
    return axios.post(`${base}/login`, data);
  };

  static Register = (data: any) => {
    return axios.post(`${base}/signup`, data);
  };

  static Logout = (data:any) => {
    return axios.post(`${base}/logout`, data, { headers: { Authorization: `${data.token}` } });
  };
}

let base = "auth";

export default AuthApi;

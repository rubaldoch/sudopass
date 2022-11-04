import axios from "./index";

class AuthApi {
  static Login = (data: any) => {
    return axios.post(`${base}/auth/login`, data);
  };

  static Register = (data: any) => {
    return axios.post(`${base}/auth/signup`, data);
  };

  static Logout = (data:any) => {
    return axios.post(`${base}/logout`, data, { headers: { Authorization: `${data.token}` } });
  };
}

let base = "users";

export default AuthApi;

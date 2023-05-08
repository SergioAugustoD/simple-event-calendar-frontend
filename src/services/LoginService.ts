import { ILogin } from "interfaces/ILogin";
import { instance } from "providers/api";

const login = async (data: ILogin) => {
  const response = await instance.post("/user/login", {
    email: data.email,
    password: data.password,
  });
  return response.data;
};

export const LoginService = {
  login,
};

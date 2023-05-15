import { IUser } from "interfaces/IUser";
import { instance } from "providers/api";

const createUser = async (data: IUser) => {
  const response = await instance.post("/user/signup", data);

  return response.data;
};

const resetPassword = async (data: IUser) => {
  const response = await instance.post("/user/reset-password", data);

  return response.data;
};

const updatePassword = async (data: IUser) => {
  const resp = await instance.post(`/user/update-password`, data);

  return resp.data;
};
export const UserService = {
  createUser,
  resetPassword,
  updatePassword,
};

import { loginState } from "atoms/Login";
import { selector } from "recoil";

export const dataLoginState = selector({
  key: "loginDataState",
  get: ({ get }) => {
    const loginData = get(loginState);
    return loginData;
  },
});

import { loginState } from "atoms/Login";
import { ILogin } from "interfaces/ILogin";
import { useCallback } from "react";
import { useRecoilState } from "recoil";

export default () => {
  const [session, setSession] = useRecoilState(loginState);

  const handleSignIn = useCallback(
    (data: ILogin) => {
      setSession(data);
      localStorage.setItem("dd", data.id_user);
      localStorage.setItem("token", data.token);
      localStorage.setItem("given_name", data.given_name);
    },
    [setSession]
  );

  const logout = useCallback(() => {
    setSession(null);
    localStorage.removeItem("dd");
    localStorage.removeItem("token");
    localStorage.removeItem("given_name");
  }, [setSession]);

  return {
    session,
    handleSignIn,
    logout,
  };
};

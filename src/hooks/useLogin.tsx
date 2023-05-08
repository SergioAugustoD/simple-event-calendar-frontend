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
    },
    [setSession]
  );

  const handleLogOut = useCallback(() => {
    setSession(null);
    localStorage.removeItem("isLicensed");
    localStorage.removeItem("login");
  }, [setSession]);

  return {
    session,
    handleSignIn,
    handleLogOut,
  };
};

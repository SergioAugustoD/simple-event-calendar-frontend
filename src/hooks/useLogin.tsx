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

  const logout = useCallback(() => {
    setSession(null);
    localStorage.removeItem("dd");
    localStorage.removeItem("token");
  }, [setSession]);

  return {
    session,
    handleSignIn,
    logout,
  };
};

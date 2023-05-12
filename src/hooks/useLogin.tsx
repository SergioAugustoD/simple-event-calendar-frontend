import { loginState } from "atoms/Login";
import { ILogin } from "interfaces/ILogin";
import { useCallback, useMemo } from "react";
import { useRecoilState } from "recoil";

export default function useAuth() {
  const [session, setSession] = useRecoilState(loginState);

  const handleSignIn = useCallback(
    (data: ILogin) => {
      setSession(data);
    },
    [setSession]
  );

  const logout = useCallback(() => {
    setSession(null);
  }, [setSession]);

  const localStorageValues = useMemo(
    () => ({
      dd: session?.userId,
      token: session?.token,
      given_name: session?.givenName,
    }),
    [session]
  );

  useMemo(() => {
    Object.entries(localStorageValues).forEach(([key, value]) => {
      if (value) {
        localStorage.setItem(key, value);
      } else {
        localStorage.removeItem(key);
      }
    });
  }, [localStorageValues]);

  return { session, handleSignIn, logout };
}

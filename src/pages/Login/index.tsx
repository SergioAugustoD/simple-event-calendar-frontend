import { useToast } from "@chakra-ui/react";
import useLogin from "hooks/useLogin";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginService } from "services/LoginService";

type FormData = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const { handleSignIn } = useLogin();
  const navigate = useNavigate();
  const toast = useToast();

  const handleFormSubmit = useMemo(
    () => async (data: FormData) => {
      window.event.preventDefault();

      if (data === null) {
        return;
      }
      const res = await LoginService.login(data);
      if (!res.err) {
        handleSignIn(res);
        toast({
          title: res.msg,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/events");
      }
      if (res.err) {
        toast({
          title: res.msg,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    },
    [handleSignIn, navigate, toast]
  );

  return (
    <div className="grid place-items-center min-h-screen bg-gradient-to-r from-gray-800 to-indigo-900">
      <div className="w-96 p-8 shadow-lg rounded-lg relative bg-gradient-to-r from-gray-900 to-gray-800">
        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          Bem vindo!
        </h2>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 text-sm text-white">
              E-mail
            </label>
            <input
              {...register("email", {
                required: "E-mail é obrigatório",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "E-mail inválido",
                },
              })}
              type="email"
              id="email"
              className="w-full p-3 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 text-sm text-white">
              Senha
            </label>
            <input
              {...register("password", {
                required: "Senha é obrigatória",
                minLength: {
                  value: 6,
                  message: "Senha precisa ter pelo menos 6 caracteres",
                },
              })}
              type="password"
              id="password"
              className="w-full p-3 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            <p className="text-red-500 text-xs mt-1">
              {errors.password?.message}
            </p>
          </div>
          <div className="grid gap-2 ">
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-2 px-4 rounded-md focus:outline-none"
            >
              Logar
            </button>
            <div className="flex justify-between ">
              <button
                onClick={() => navigate("/signup", { replace: true })}
                className="text-blue-500 hover:text-blue-600 text-sm"
              >
                Criar conta
              </button>
              <p className="text-sm">
                <a
                  href="/forgot-password"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Esqueceu a senha?
                </a>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

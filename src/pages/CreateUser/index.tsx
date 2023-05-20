import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff, FiMail, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { UserService } from "services/UserService";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  givenName: string;
};

const SignupPage: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormData>();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickPassword = () => setShowPassword(!showPassword);

  const password = watch("password", "");

  const navigate = useNavigate();

  const handleFormSubmit = async (data: FormData) => {
    const response = await UserService.createUser(data);
    const { status, msg } = response;

    if (status !== 200) {
      toast.error(msg);
    } else {
      toast.success(msg);
      navigate("/");
    }
  };

  const onSubmit = handleSubmit(handleFormSubmit);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-indigo-900">
      <div className="flex flex-col w-full sm:w-1/2 max-w-3xl p-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          Cadastre-se
        </h2>
        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 gap-4 w-full sm:w-80 self-center"
        >
          <div>
            <div className="relative">
              <FiUser size={16} className="absolute top-3 left-3 text-black" />
              <input
                {...register("name", {
                  required: "Nome é obrigatório",
                })}
                type="text"
                id="name"
                placeholder="Nome"
                className="w-full p-3 pl-10 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <p className="text-red-500 text-xs mt-1">{errors.name?.message}</p>
          </div>
          <div>
            <div className="relative">
              <FiMail size={16} className="absolute top-3 left-3 text-black" />
              <input
                {...register("email", {
                  required: "E-mail é obrigatório",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                id="email"
                placeholder="E-mail"
                className="w-full p-3 pl-10 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
          </div>
          <div>
            <div className="relative">
              <FiUser size={16} className="absolute top-3 left-3 text-black" />
              <input
                {...register("givenName", {
                  required: "Apelido é obrigatório",
                })}
                type="text"
                id="givenName"
                placeholder="Apelido"
                className="w-full p-3 pl-10 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <p className="text-red-500 text-xs mt-1">
              {errors.givenName?.message}
            </p>
          </div>
          <div>
            <div className="relative">
              {!showPassword ? (
                <FiEye
                  size={16}
                  className="absolute top-3 left-3 text-black cursor-pointer"
                  onClick={handleClickPassword}
                />
              ) : (
                <FiEyeOff
                  size={16}
                  className="absolute top-3 left-3 text-black cursor-pointer"
                  onClick={handleClickPassword}
                />
              )}
              <input
                {...register("password", {
                  required: "Senha é obrigatória",
                  minLength: {
                    value: 6,
                    message: "Senha precisa ter pelo menos 6 caracteres",
                  },
                })}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Senha"
                className="w-full p-3 pl-10 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <p className="text-red-500 text-xs mt-1">
              {errors.password?.message}
            </p>
            <p className="text-xs mt-1 text-white">
              Força da senha:{" "}
              {password.length > 0 ? getPasswordStrength(password) : "N/A"}
            </p>
          </div>
          <div>
            <div className="relative">
              {!showPassword ? (
                <FiEye
                  size={16}
                  className="absolute top-3 left-3 text-black cursor-pointer"
                  onClick={handleClickPassword}
                />
              ) : (
                <FiEyeOff
                  size={16}
                  className="absolute top-3 left-3 text-black cursor-pointer"
                  onClick={handleClickPassword}
                />
              )}
              <input
                {...register("confirmPassword", {
                  required: "Confirme a senha é obrigtória",
                  validate: (value) =>
                    value === password || "Senhas não são iguais",
                })}
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirme a senha"
                className="w-full p-3 pl-10 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword?.message}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-between">
            <button
              type="submit"
              className="text-black bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full mr-2 px-5 py-2.5 text-center mb-2 sm:mb-0"
            >
              Criar
            </button>
            <button
              className="text-black bg-gray-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              onClick={() => navigate("/login")}
            >
              Voltar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

function getPasswordStrength(password: string): string {
  const patterns: { [key: string]: RegExp } = {
    digit: /\d/,
    lowercase: /[a-z]/,
    uppercase: /[A-Z]/,
    special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
  };

  const strength = Object.keys(patterns).reduce((count, pattern) => {
    return count + (patterns[pattern].test(password) ? 1 : 0);
  }, 0);

  if (strength === 0) {
    return "Weak";
  } else if (strength === 1 || strength === 2) {
    return "Medium";
  } else {
    return "Strong";
  }
}

export default SignupPage;

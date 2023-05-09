import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { UserService } from "services/UserService";
import { useQuery } from "hooks/useQuery";
import { BiHide, BiShow } from "react-icons/bi";
import { IUser } from "interfaces/IUser";

export const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toast = useToast();
  const query = useQuery();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleResetPassword = async (data: IUser) => {
    // Verifique se as senhas digitadas correspondem
    if (data.password !== data.confirmPassword) {
      toast({
        title: "As senhas digitadas não correspondem.",
        status: "error",
        duration: 3000,
      });
      return;
    }

    // Lógica para enviar a solicitação de redefinição de senha para o backend
    const response = await UserService.updatePassword({
      password: data.password,
      email: query.get("email"),
    });

    if (response.err) {
      toast({ title: response.msg, duration: 3000, status: "error" });
      return;
    }

    // Mensagem de sucesso ou redirecionar para outra página
    toast({
      title: "Senha redefinida com sucesso!",
      duration: 3000,
      status: "success",
    });

    // Limpar os campos de senha
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const togglePasswordVisibility = (field: string) => {
    if (field === "password") {
      setShowPassword((prevState) => !prevState);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword((prevState) => !prevState);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={4}>
      <Heading size="lg" textAlign="center" mb={6}>
        Redefinir Senha
      </Heading>
      <VStack spacing={4} alignItems="stretch">
        <FormControl id="password">
          <FormLabel>Senha</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => togglePasswordVisibility("password")}
              >
                {showPassword ? <BiHide /> : <BiShow />}
              </Button>
            </InputRightElement>
          </InputGroup>
          {errors.password && (
            <Box color="red" mt={1}>
              Campo obrigatório.
            </Box>
          )}
        </FormControl>
        <FormControl id="confirmPassword">
          <FormLabel>Confirmar Senha</FormLabel>
          <InputGroup>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword", { required: true })}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => togglePasswordVisibility("confirmPassword")}
              >
                {showConfirmPassword ? <BiHide /> : <BiShow />}
              </Button>
            </InputRightElement>
          </InputGroup>
          {errors.confirmPassword && (
            <Box color="red" mt={1}>
              Campo obrigatório.
            </Box>
          )}
        </FormControl>
        <Button
          colorScheme="blue"
          onClick={handleSubmit(handleResetPassword)}
          isLoading={isSubmitting}
        >
          Redefinir Senha
        </Button>
      </VStack>
    </Box>
  );
};

export default ResetPassword;

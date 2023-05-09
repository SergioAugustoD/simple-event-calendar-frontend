import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useForm, useFormState } from "react-hook-form";
import { UserService } from "services/UserService";
import { useNavigate } from "react-router-dom";

type FormData = {
  email: string;
};

const ForgotPassword: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const toast = useToast();

  const handleFormSubmit = async (data: FormData) => {
    // Implemente a lógica para enviar a solicitação de redefinição de senha para o backend
    const response = await UserService.resetPassword(data);

    if (response.err) {
      toast({ title: response.msg, duration: 3000, status: "error" });
      return;
    }
    console.log(response);
    // Exiba uma mensagem de sucesso ou redirecione para outra página
    toast({
      title: "Email enviado com sucesso!",
      duration: 3000,
      status: "success",
    });
  };

  return (
    <Box maxWidth="400px" margin="0 auto" mt="8">
      <Heading mb="4" size="lg" textAlign="center">
        Forgot Password
      </Heading>
      <Box borderWidth="1px" borderRadius="lg" p="6">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Stack spacing="4">
            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                id="email"
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <Button type="submit" isLoading={isSubmitting} colorScheme="teal">
              Send Recovery Email
            </Button>
          </Stack>
        </form>
      </Box>
      <Text mt="4" textAlign="center">
        Remember your password? <a href="/login">Log in</a>
      </Text>
    </Box>
  );
};

export default ForgotPassword;

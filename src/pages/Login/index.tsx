import React, { useCallback, useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useLogin from "hooks/useLogin";
import { LoginService } from "services/LoginService";
import styled from "styled-components";
import { LoginFormContainer, LoginHeading } from "./styles";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  const handleFormSubmit = useMemo(
    () => async (data: FormData) => {
      window.event.preventDefault();
      setIsLoading(true);

      if (data === null) {
        setIsLoading(false);
        return;
      }
      const res = await LoginService.login(data);
      if (!res.err) {
        setTimeout(() => {
          setIsLoading(false);
          handleSignIn(res);
          toast({
            title: res.msg,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          navigate("/events");
        }, 2000);
      }
      if (res.err) {
        setIsLoading(false);
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
    <Container>
      <LoginHeading size="lg">Login</LoginHeading>
      <LoginFormContainer borderWidth="1px" borderRadius="lg" p="6">
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
            <FormControl isInvalid={!!errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must have at least 6 characters",
                  },
                })}
                type="password"
                id="password"
              />
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>
            <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
              Log In
            </Button>
            <Button
              variant="outline"
              colorScheme="teal"
              onClick={() => navigate("/signup", { replace: true })}
            >
              Create Account
            </Button>
            <Text textAlign="center">
              <a href="/forgot-password">Forgot Password?</a>
            </Text>
          </Stack>
        </form>
      </LoginFormContainer>
    </Container>
  );
};

export default LoginPage;

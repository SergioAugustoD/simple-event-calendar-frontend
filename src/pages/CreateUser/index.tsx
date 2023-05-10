import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  Stack,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { BiHide, BiShow } from "react-icons/bi";
import { UserService } from "services/UserService";
import { useNavigate } from "react-router-dom";
import {
  Container,
  ErrorBox,
  PasswordToggleBtn,
  SignUpForm,
  SignUpHeading,
} from "./styles";
type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  given_name: string;
};

const SignupPage: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormData>();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const password = React.useRef("");
  password.current = watch("password", "");
  const toast = useToast();
  const navigate = useNavigate();

  const handleFormSubmit = async (data: FormData) => {
    window.event.preventDefault();

    const response = await UserService.createUser(data);

    if (response.status === 200) {
      toast({ title: response.msg, duration: 3000, status: "success" });
      navigate("/");
    }
    if (response.err) {
      toast({ title: response.msg, duration: 3000, status: "error" });
    }
  };

  const onSubmit = handleSubmit(handleFormSubmit);

  return (
    <Container>
      <SignUpHeading mb="4" size="lg">
        Sign Up
      </SignUpHeading>
      <Box borderWidth="1px" borderRadius="lg" p="6">
        <SignUpForm onSubmit={onSubmit}>
          <Stack spacing="4">
            <FormControl isInvalid={!!errors.name}>
              <FormLabel htmlFor="name">Nome</FormLabel>
              <Input
                {...register("name", {
                  required: "Nome is required",
                })}
                type="name"
                id="name"
              />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>
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
            <FormControl isInvalid={!!errors.given_name}>
              <FormLabel htmlFor="given_name">Apelido</FormLabel>
              <Input
                {...register("given_name", {
                  required: "Apelido é obrigatório",
                })}
                type="given_name"
                id="given_name"
              />
              <FormErrorMessage>{errors.given_name?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup>
                <Input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must have at least 6 characters",
                    },
                  })}
                  type={show ? "text" : "password"}
                  id="password"
                />
                <InputRightElement width="4.5rem">
                  <PasswordToggleBtn
                    h="1.75rem"
                    onClick={handleClick}
                    aria-label={show ? "Hide password" : "Show password"}
                  >
                    {show ? <BiHide /> : <BiShow />}
                  </PasswordToggleBtn>
                </InputRightElement>
              </InputGroup>

              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              <FormHelperText>
                Password strength:{" "}
                {password.current.length > 0
                  ? getPasswordStrength(password.current)
                  : "N/A"}
              </FormHelperText>
            </FormControl>
            <FormControl isInvalid={!!errors.confirmPassword}>
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === password.current || "Passwords do not match",
                  })}
                  type={show ? "text" : "password"}
                  id="confirmPassword"
                />
                <InputRightElement width="4.5rem">
                  <PasswordToggleBtn
                    h="1.75rem"
                    onClick={handleClick}
                    aria-label={show ? "Hide password" : "Show password"}
                  >
                    {show ? <BiHide /> : <BiShow />}
                  </PasswordToggleBtn>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {errors.confirmPassword?.message}
              </FormErrorMessage>
            </FormControl>
            <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
              Sign Up
            </Button>
          </Stack>
        </SignUpForm>
      </Box>
    </Container>
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

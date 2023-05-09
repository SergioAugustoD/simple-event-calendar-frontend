import { useCallback, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "hooks/useLogin";
import { ILogin } from "interfaces/ILogin";
import { LoginService } from "services/LoginService";
import { useToast } from "@chakra-ui/react";

const LoginPage = () => {
  const [dataLogin, setDataLogin] = useState<ILogin>(null);
  const { handleSignIn } = useLogin();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  const handleLogin = useCallback(async () => {
    window.event.preventDefault();
    setIsLoading(true);

    if (dataLogin === null) {
      setIsLoading(false);
      return;
    }
    const res = await LoginService.login(dataLogin);
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
  }, [dataLogin, handleSignIn, navigate]);

  return (
    <Container>
      <LoginForm>
        <Title>Login</Title>
        <Form onSubmit={handleLogin}>
          <FormGroup>
            <Label>Email:</Label>
            <Input
              type="email"
              onChange={(e) =>
                setDataLogin({ ...dataLogin, email: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label>Password:</Label>
            <Input
              type="password"
              onChange={(e) =>
                setDataLogin({ ...dataLogin, password: e.target.value })
              }
            />
          </FormGroup>
          <Button type="submit">Login</Button>
          <Link to="/create-user">Criar</Link>
          <Link to="/forgot-pass">Esqueceu a senha</Link>
        </Form>
      </LoginForm>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginForm = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default LoginPage;

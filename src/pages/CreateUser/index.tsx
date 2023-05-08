import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 16px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 200px;
  height: 32px;
  margin-bottom: 8px;
`;

const Button = styled.button`
  width: 120px;
  height: 32px;
`;

const CreateUserPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para criar o usuário
    console.log("Usuário criado:", name, email, password);
    // Limpar os campos
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <Container>
      <Title>Create User</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          required
        />
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <Button type="submit">Create</Button>
      </Form>
    </Container>
  );
};

export default CreateUserPage;

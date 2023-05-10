import { Box, Button, Heading } from "@chakra-ui/react";
import styled from "styled-components";

export const Container = styled(Box)`
  max-width: 400px;
  margin: 0 auto;
  margin-top: 8px;
  padding: 4px;
`;

export const SignUpHeading = styled(Heading)`
  margin-bottom: 4px;
  text-align: center;
`;

export const SignUpForm = styled.form`
  margin-top: 4px;
`;

export const PasswordToggleBtn = styled(Button)`
  height: 1.75rem;
  size: sm;
`;

export const ErrorBox = styled.div`
  color: red;
  margin-top: 4px;
`;

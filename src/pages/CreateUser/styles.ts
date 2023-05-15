import { Box, BoxProps, Button, Heading } from "@chakra-ui/react";
import styled from "styled-components";

export const Container = styled(Box)<BoxProps>`
  && {
    display: flex;
    align-content: center;
    justify-content: center;
    max-width: 400px;
    margin: 0 auto;
    margin-top: 20px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  }
`;

export const SignUpHeading = styled(Heading)`
  && {
    margin-bottom: 20px;
    text-align: center;
    color: #333;
    font-size: 32px;
  }
`;

export const SignUpForm = styled.form`
  && {
    margin-top: 20px;
  }
`;

export const PasswordToggleBtn = styled(Button)`
  && {
    height: 40px;
    width: 80px;
    font-size: 14px;
    border-radius: 5px;
    background-color: #333;
    color: #fff;
    margin-left: 10px;
  }
  &:hover {
    background-color: #555;
  }
`;

export const ErrorBox = styled.div`
  && {
    color: red;
    margin-top: 20px;
    font-size: 14px;
  }
`;

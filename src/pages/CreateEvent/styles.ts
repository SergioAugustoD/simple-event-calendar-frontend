import { Button, Heading } from "@chakra-ui/react";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;

  @media (max-width: 768px) {
    margin-left: 0px;
    display: flex;
    justify-content: flex-start;
  }
`;

export const CreateEventHeading = styled(Heading)`
  font-size: 24px;
  margin-bottom: 16px;
  text-align: center;
`;

export const ErrorBox = styled.div`
  color: red;
  margin-top: 4px;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 45vw;
`;

export const StyledButton = styled(Button)`
  margin-right: 8px;
`;

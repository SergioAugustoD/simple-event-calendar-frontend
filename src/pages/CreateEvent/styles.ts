import { Button, Heading } from "@chakra-ui/react";
import styled from "styled-components";

export const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
      margin-left: 0px;
      display: flex;
      justify-content: flex-start;
      padding: 16px;
    }
  }
`;

export const CreateEventHeading = styled(Heading)`
  && {
    font-size: 32px;
    margin-bottom: 24px;
    text-align: center;
    color: #333;
  }
`;

export const ErrorBox = styled.div`
  && {
    color: red;
    margin-top: 8px;
    font-size: 16px;
  }
`;

export const Form = styled.form`
  && {
    width: 100%;
    max-width: 60vw;
  }
`;

export const StyledButton = styled(Button)`
  && {
    margin-right: 8px;
    border-radius: 5px;
    background-color: #333;
    color: #fff;

    &:hover {
      background-color: #555;
    }
  }
`;

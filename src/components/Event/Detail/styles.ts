import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Text,
  TextProps,
} from "@chakra-ui/react";
import styled from "styled-components";

export const Container = styled(Box)<BoxProps>``;

export const EventInfo = styled(Text)<TextProps>`
  display: flex;
  flex-direction: row;
`;

export const DeleteButton = styled(Button)<ButtonProps>``;

export const StyledButton = styled.button`
  && {
    background-color: #ff5722;
    color: #ffffff;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    margin: 5px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #e64a19;
    }

    @media screen and (max-width: 768px) {
      font-size: 0.8rem;
    }
  }
`;

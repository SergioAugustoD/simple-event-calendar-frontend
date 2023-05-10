import {
  Box,
  Button,
  Heading,
  HeadingProps,
  Text,
  ButtonProps,
} from "@chakra-ui/react";
import styled from "styled-components";

export const Container = styled(Box)`
  padding: 1rem;
`;

export const EventTitle = styled(Heading)<HeadingProps>`
  margin-bottom: 1rem;
`;

export const EventDetails = styled(Box)`
  padding: 1rem;
  border-width: 1px;
  border-radius: md;
  box-shadow: md;
`;

export const EventInfo = styled(Text)`
  font-size: lg;
  margin-bottom: 2rem;
`;

export const DeleteButton = styled(Button)<ButtonProps>`
  color-scheme: red;
`;

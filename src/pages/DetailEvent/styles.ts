import { Box, Button, Heading, Text, ButtonProps } from "@chakra-ui/react";
import styled from "styled-components";

export const Container = styled(Box)`
  padding: 1rem;
`;

export const EventTitle = styled(Heading)`
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

export const ParticipantsList = styled(Box)`
  margin-top: 1rem;
`;

export const ParticipantItem = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const ParticipantName = styled(Text)`
  margin-left: 0.5rem;
`;

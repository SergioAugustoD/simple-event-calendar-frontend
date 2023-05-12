import { Box, Button, Heading, Text, ButtonProps } from "@chakra-ui/react";
import styled from "styled-components";

type EventDeailProps = {
  confirme_until: string;
};

export const Container = styled(Box)`
  padding: 2rem;
  background-color: #f8f8f8;
`;

export const EventTitle = styled(Heading)`
  margin-bottom: 2rem;
  color: #333333;
  font-size: 2rem;
`;

export const EventDetails = styled(Box)<EventDeailProps>`
  padding: 1rem;
  border: 1px solid #cccccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
`;

export const EventInfo = styled(Text)`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #555555;
`;

export const DeleteButton = styled(Button)<ButtonProps>`
  background-color: #e74c3c;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c0392b;
  }
`;

export const ParticipantsList = styled(Box)`
  margin-top: 2rem;
`;

export const ParticipantItem = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const ParticipantName = styled(Text)`
  margin-left: 1rem;
  color: #333333;
  font-size: 1.2rem;
`;

export const StyledButton = styled.button`
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
`;

import { Box, Button, Heading, Text } from "@chakra-ui/react";
import styled from "styled-components";

export const Container = styled(Box)`
  && {
    padding: 2rem;
  }
`;

export const EventCard = styled(Box)`
  && {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.3s ease;
  }
  &:hover {
    transform: translateY(-3px);
  }
`;

export const EventCardContent = styled(Box)`
  && {
    padding: 1.5rem;
  }
`;

export const EventTitle = styled(Heading)`
  && {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

export const EventInfo = styled(Text)`
  && {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
`;

export const CreateButton = styled(Button)`
  && {
    background-color: #ff6b6b;
    color: #fff;
    padding: 0.75rem 1.5rem;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  &:hover {
    background-color: #e36262;
  }
`;

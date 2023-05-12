import { Box, Heading, Text } from "@chakra-ui/react";
import styled from "styled-components";

export const Container = styled(Box)`
  padding: 1rem;
`;

export const EventTitle = styled(Heading)`
  margin-bottom: 1rem;
`;

export const EventList = styled(Box)`
  margin-top: 2rem;
`;

export const EventItem = styled(Box)`
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

export const EventDetails = styled(Text)`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

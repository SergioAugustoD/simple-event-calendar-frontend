import { Box, Heading } from "@chakra-ui/react";
import styled from "styled-components";

export const Container = styled(Box)`
  max-width: 400px;
  margin: 0 auto;
  margin-top: 8;
  padding: 4;
`;

export const LoginHeading = styled(Heading)`
  margin-bottom: 4;
  text-align: center;
`;

export const LoginFormContainer = styled(Box)`
  border-width: 1px;
  border-radius: lg;
  padding: 6;
`;

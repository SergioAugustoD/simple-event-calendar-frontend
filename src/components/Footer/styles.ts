import { Box, Text } from "@chakra-ui/react";
import styled from "styled-components";

export const FooterContainer = styled(Box)`
  display: flex;
  justify-content: center;
  background: rgb(40, 40, 42);
  background: linear-gradient(
    270deg,
    rgba(40, 40, 42, 1) 0%,
    rgba(1, 1, 5, 1) 50%
  );
  color: white;
  padding: 2rem;
  position: absolute;
  width: 100vw;
  bottom: 0;
  height: 5.27vh;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const FooterText = styled(Text)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;

  svg {
    margin-left: 1rem;
  }
`;

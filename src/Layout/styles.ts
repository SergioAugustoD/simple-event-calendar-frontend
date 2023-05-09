import { Box, Flex } from "@chakra-ui/react";
import styled from "styled-components";

type SidebarProps = {
  open: boolean;
};

export const Container = styled(Flex)`
  height: 100vh;
  background-color: #333;
  color: #fff;
`;

export const Sidebar = styled.div<SidebarProps>`
  display: flex;
  flex-direction: column;
  width: 10.41vw;
  transition: transform 0.3s ease-in-out;
  padding: 4;

  ${(props) =>
    props.open &&
    `
    transform: translateX(0);
  `}

  ${(props) =>
    !props.open &&
    `
    transform: translateX(-100%);
  `}

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    transform: translateX(-100%);
    width: 100%;
    max-width: 250px;
    height: 100vh;
    overflow-y: auto;
    transition: transform 0.3s ease-in-out;

    ${(props) =>
      props.open &&
      `
      transform: translateX(0);
    `}
  }
`;

export const Content = styled(Box)`
  flex: 1;
  background-color: #fff;
  color: #000000;
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 998;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import useLogin from "hooks/useLogin";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Content,
  Header,
  MenuButton,
  MenuItem,
  MenuList,
} from "./styles";

type PageProps = {
  children: React.ReactNode;
};

const useHeader = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { logout } = useLogin();
  const [state, setState] = useState({
    isMenuOpen: false,
    isHeaderTransparent: true,
  });

  const handleToggleMenu = () => {
    setState((prevState) => ({
      ...prevState,
      isMenuOpen: !prevState.isMenuOpen,
    }));
  };

  const handleLogout = useCallback(async () => {
    toast({
      title: "Deslogado com sucesso",
      duration: 3000,
      status: "success",
    });
    logout();
    navigate("/", { replace: true });
  }, []);

  useLayoutEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setState((prevState) => ({
        ...prevState,
        isHeaderTransparent: scrollTop === 0,
      }));
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    ...state,
    handleToggleMenu,
    handleLogout,
    navigate,
    setState,
  };
};

const Page: React.FC<PageProps> = React.memo(({ children }) => {
  const {
    isMenuOpen,
    isHeaderTransparent,
    handleToggleMenu,
    handleLogout,
    navigate,
    setState,
  } = useHeader();

  return (
    <Container>
      <Header isTransparent={isHeaderTransparent}>
        <h1>Event Calendar</h1>
        <nav>
          <MenuButton onClick={handleToggleMenu}>
            {isMenuOpen ? (
              <CloseIcon w={7} h={7} />
            ) : (
              <HamburgerIcon w={7} h={7} />
            )}
          </MenuButton>
        </nav>
      </Header>
      <Content>{children}</Content>
      <MenuList isOpen={isMenuOpen}>
        <MenuItem>
          <MenuButton
            onClick={() => {
              setState((prevState) => ({
                ...prevState,
                isMenuOpen: !prevState.isMenuOpen,
              }));
              navigate("/events");
            }}
          >
            Eventos
          </MenuButton>
        </MenuItem>
        <MenuItem>
          <MenuButton
            onClick={() => {
              setState((prevState) => ({
                ...prevState,
                isMenuOpen: !prevState.isMenuOpen,
              }));
              navigate("/events-confirmation");
            }}
          >
            Meus Eventos
          </MenuButton>
        </MenuItem>
        <MenuItem>
          <MenuButton
            onClick={() => {
              setState((prevState) => ({
                ...prevState,
                isMenuOpen: !prevState.isMenuOpen,
              }));
              navigate("/about");
            }}
          >
            About
          </MenuButton>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <MenuButton onClick={handleLogout}>{<FiLogOut />}</MenuButton>
        </MenuItem>
      </MenuList>
    </Container>
  );
});

export default Page;

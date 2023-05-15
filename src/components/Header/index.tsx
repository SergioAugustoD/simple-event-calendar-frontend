import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import Menu from "components/MenuList";
import useLogin from "hooks/useLogin";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header, MenuButton } from "./styles";

const HeaderWithMenu: React.FC = React.memo(() => {
  const toast = useToast();
  const navigate = useNavigate();
  const { logout } = useLogin();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderTransparent, setIsHeaderTransparent] = useState(true);

  const handleToggleMenu = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsHeaderTransparent(scrollTop === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
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
      <Menu
        handleLogout={handleLogout}
        handleToggleMenu={handleToggleMenu}
        isOpen={isMenuOpen}
      />
    </Header>
  );
});

export default HeaderWithMenu;

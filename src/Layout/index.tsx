import React, { useCallback } from "react";
import {
  Button,
  IconButton,
  useDisclosure,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { FiLogOut, FiCalendar } from "react-icons/fi";
import { BsQuestionSquare } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import useLogin from "hooks/useLogin";
import { Backdrop, BoxUser, Container, Content, Sidebar } from "./styles";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onToggle } = useDisclosure();
  const [isSmallerScreen] = useMediaQuery("(max-width: 768px)");
  const { logout } = useLogin();

  const handleToggleSidebar = useCallback(() => {
    onToggle();
  }, [onToggle]);

  const handleCloseSidebar = useCallback(() => {
    if (isOpen) {
      onToggle();
    }
  }, [isOpen, onToggle]);

  const handleLogout = useCallback(async () => {
    setTimeout(() => {
      toast({
        title: "Deslogado com sucesso",
        duration: 3000,
        status: "success",
      });
      logout();
      navigate("/", { replace: true });
    }, 2000);
  }, []);

  return (
    <Container>
      {isSmallerScreen && (
        <IconButton
          aria-label="Toggle Sidebar"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          variant="ghost"
          size="lg"
          ml={2}
          mt={2}
          onClick={handleToggleSidebar}
        />
      )}
      {isSmallerScreen && isOpen && <Backdrop onClick={handleToggleSidebar} />}
      <Sidebar open={!isSmallerScreen || isOpen}>
        <BoxUser className="box-user">USUÁRIO</BoxUser>
        <Button
          leftIcon={<FiCalendar />}
          variant="ghost"
          colorScheme="orange"
          justifyContent="center"
          width="100%"
          onClick={() => navigate("/events")}
        >
          Eventos
        </Button>
        <Button
          leftIcon={<BsQuestionSquare />}
          variant="ghost"
          colorScheme="orange"
          justifyContent="center"
          width="100%"
          marginBottom={2}
          onClick={() => navigate("/about")}
        >
          About
        </Button>
        <IconButton
          aria-label="Logout"
          icon={<FiLogOut />}
          variant="ghost"
          onClick={handleLogout}
          colorScheme="orange"
          fontSize="24px"
          name="Logout"
          justifyContent="flex-start"
          marginTop="auto"
        />
      </Sidebar>
      <Content onClick={handleCloseSidebar}>{children}</Content>
    </Container>
  );
};

export default React.memo(Layout);

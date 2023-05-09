import React from "react";
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
import { Backdrop, Container, Content, Sidebar } from "./styles";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import useLogin from "hooks/useLogin";

type SidebarProps = {
  children: React.ReactNode;
};

const Layout: React.FC<SidebarProps> = ({ children }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onToggle } = useDisclosure();
  const [isSmallerScreen] = useMediaQuery("(max-width: 768px)");
  const { logout } = useLogin();

  const handleToggleSidebar = () => {
    onToggle();
  };

  const handleCloseSidebar = () => {
    if (isOpen) {
      onToggle();
    }
  };

  const handleLogout = async () => {
    setTimeout(() => {
      toast({
        title: "Deslogado com sucesso",
        duration: 3000,
        status: "success",
      });
      logout();
      navigate("/");
    }, 2000);
  };

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
      <Sidebar open={!isSmallerScreen || isOpen}>
        <IconButton
          aria-label="Logout"
          icon={<FiLogOut />}
          variant="ghost"
          onClick={handleLogout}
          colorScheme="red"
          fontSize="20px"
          marginBottom={4}
        />
        <Button
          leftIcon={<FiCalendar />}
          variant="ghost"
          colorScheme="red"
          justifyContent="flex-start"
          width="100%"
          onClick={() => navigate("/events")}
        >
          Eventos
        </Button>
        <Button
          leftIcon={<BsQuestionSquare />}
          variant="ghost"
          colorScheme="red"
          justifyContent="flex-start"
          width="100%"
          marginBottom={2}
          onClick={() => navigate("/about")}
        >
          About
        </Button>
      </Sidebar>
      <Content p={4} onClick={handleCloseSidebar}>
        {children}
      </Content>
      {isOpen && <Backdrop onClick={handleToggleSidebar} />}
    </Container>
  );
};

export default Layout;

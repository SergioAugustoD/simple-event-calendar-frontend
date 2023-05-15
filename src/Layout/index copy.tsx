import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  useDisclosure,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import useLogin from "hooks/useLogin";
import React, { useCallback } from "react";
import { BsQuestionSquare } from "react-icons/bs";
import { FiCalendar, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Backdrop, Container, UserBox } from "./styles";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = React.memo(({ children }) => {
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
      <header>
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
      </header>
      {isSmallerScreen && isOpen && <Backdrop onClick={handleToggleSidebar} />}
      <aside>
        <UserBox className="box-user">USUÁRIO</UserBox>
        <Button
          leftIcon={<FiCalendar />}
          variant="ghost"
          colorScheme="orange"
          justifyContent="flex-start"
          width="100%"
          onClick={() => navigate("/events")}
        >
          Eventos
        </Button>
        <Button
          leftIcon={<FiCalendar />}
          variant="ghost"
          colorScheme="orange"
          justifyContent="flex-start"
          width="100%"
          onClick={() => navigate("/events-confirmation")}
        >
          Meus Eventos
        </Button>
        <Button
          leftIcon={<BsQuestionSquare />}
          variant="ghost"
          colorScheme="orange"
          justifyContent="flex-start"
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
      </aside>
      <main onClick={handleCloseSidebar}>{children}</main>
    </Container>
  );
});

export default React.memo(Layout);

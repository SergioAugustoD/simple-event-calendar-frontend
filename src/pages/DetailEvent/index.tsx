import React from "react";
import { Box, Button, Heading, Text, useToast, Flex } from "@chakra-ui/react";
import { AiFillDelete } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { EventService } from "services/EventService";

const EventDetailPage: React.FC = () => {
  const useLoc = useLocation();
  const { id_user, id, title, date, description, location } =
    useLoc.state.event;
  const navigate = useNavigate();
  const toast = useToast();
  const iduser = localStorage.getItem("dd");

  const handleDelete = async (id: number) => {
    try {
      await EventService.deleteEvent(id);
      toast({
        title: "Evento deletado com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/events", { replace: true });
    } catch (error) {
      toast({
        title: "Erro ao deletar o evento.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Heading as="h1" size="xl" mb={4}>
        Detalhes do Evento
      </Heading>
      <Box p={4} borderWidth={1} borderRadius="md" shadow="md">
        <Text fontSize="lg" mb={2}>
          <strong>Título:</strong> {title}
        </Text>
        <Text fontSize="lg" mb={2}>
          <strong>Data:</strong> {date}
        </Text>
        <Text fontSize="lg" mb={2}>
          <strong>Descrição:</strong> {description}
        </Text>
        <Text fontSize="lg" mb={4}>
          <strong>Localização:</strong> {location}
        </Text>
        {id_user === parseInt(iduser) && (
          <Flex justify="flex-end">
            <Button
              colorScheme="red"
              variant="ghost"
              onClick={() => handleDelete(id)}
              leftIcon={<AiFillDelete />}
            >
              Deletar Evento
            </Button>
          </Flex>
        )}
      </Box>
      <Button mt={4} onClick={() => navigate("/events", { replace: true })}>
        Voltar
      </Button>
    </Box>
  );
};

export default EventDetailPage;

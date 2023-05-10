import React from "react";
import { Button, useToast, Flex, Heading } from "@chakra-ui/react";
import { AiFillDelete } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { EventService } from "services/EventService";
import {
  Container,
  DeleteButton,
  EventDetails,
  EventInfo,
  EventTitle,
} from "./styles";
import { BiMap } from "react-icons/bi";

const EventDetailPage: React.FC = () => {
  const useLoc = useLocation();
  const {
    id_user,
    id,
    title,
    date,
    description,
    location,
    category,
    created_by,
  } = useLoc.state.event;
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
    <Container>
      <Heading as="h1" size="xl" mb={4}>
        Detalhes do Evento
      </Heading>
      <EventDetails p={4} borderWidth={1} borderRadius="md" shadow="md">
        <EventInfo fontSize="lg" mb={4}>
          <strong>Título:</strong> {title}
          <strong style={{ marginLeft: "25px" }}>Categoria:</strong> {category}
        </EventInfo>
        <EventInfo fontSize="lg" mb={4}>
          <strong>Data:</strong> {date}
        </EventInfo>
        <EventInfo fontSize="lg" mb={4}>
          <strong>Descrição:</strong> {description}
        </EventInfo>
        <EventInfo fontSize="lg" mb={4}>
          <strong>Localização:</strong> {location}
        </EventInfo>
        <EventInfo fontSize="lg" mb={4} display="flex" flexDirection="row">
          <strong>Mapa: </strong>
          <a
            href={`https://www.google.com.br/maps/place/${location}`}
            target="_blank"
          >
            <BiMap size={24} color="red" />
          </a>
          <strong style={{ marginLeft: "25px" }}>Autor:</strong> {created_by}
        </EventInfo>
        {id_user === parseInt(iduser) && (
          <Flex justify="flex-start">
            <DeleteButton
              colorScheme="red"
              variant="ghost"
              onClick={() => handleDelete(id)}
              leftIcon={<AiFillDelete />}
            >
              Deletar Evento
            </DeleteButton>
          </Flex>
        )}
      </EventDetails>
      <Button mt={4} onClick={() => navigate("/events")}>
        Voltar
      </Button>
    </Container>
  );
};

export default EventDetailPage;

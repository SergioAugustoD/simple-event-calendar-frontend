import React, { useState, useEffect } from "react";
import {
  Button,
  useToast,
  Flex,
  Heading,
  Box,
  Text,
  CircularProgress,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  List,
  ListItem,
  ModalFooter,
} from "@chakra-ui/react";
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

const EventDetailPage = () => {
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
  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchParticipants = async () => {
      setIsLoading(true);
      const data = await EventService.getParticipants({ id_event: id });
      if (data) {
        setParticipants(data);
        setIsLoading(false);
      }
    };
    fetchParticipants();
  }, [id]);

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

  const handleAddParticipant = async () => {
    try {
      const currentUser = localStorage.getItem("given_name");
      if (currentUser && currentUser !== created_by) {
        await EventService.addUserToEvent({
          id_event: id,
          id_user: id_user,
          name_participant: currentUser,
        });
        setParticipants((prevParticipants) => [
          ...prevParticipants,
          { name_participant: currentUser },
        ]);
        toast({
          title: "Você foi adicionado à lista de participantes!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Você não pode se adicionar à lista de participantes.",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao adicionar participante.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <Heading as="h1" size="xl" mb={4}>
        Detalhes do Evento
      </Heading>
      <EventDetails p={4} borderWidth={1} borderRadius="md" shadow="md">
        {isLoading && (
          <CircularProgress alignSelf={"center"} size="70px" isIndeterminate />
        )}
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
            rel="noopener noreferrer"
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
        <Flex justify="flex-end">
          <Button onClick={handleModalOpen} mt={4} variant="outline">
            Visualizar Participantes
          </Button>
        </Flex>
      </EventDetails>

      <Button mt={4} onClick={() => navigate("/events")}>
        Voltar
      </Button>
      {id_user !== parseInt(iduser) && (
        <Button mt={4} onClick={handleAddParticipant}>
          Participar do Evento
        </Button>
      )}

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Lista de Participantes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {participants.length > 0 ? (
              <List spacing={3}>
                {participants.map((participant, index) => (
                  <ListItem key={index}>
                    {participant.name_participant}
                  </ListItem>
                ))}
              </List>
            ) : (
              <Text>Nenhum participante registrado.</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleModalClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default EventDetailPage;

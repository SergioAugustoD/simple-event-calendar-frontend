import { useState, useEffect } from "react";
import {
  Button,
  useToast,
  Flex,
  Heading,
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
  StyledButton,
} from "./styles";
import { BiMap } from "react-icons/bi";
import { ArrowBackIcon } from "@chakra-ui/icons";

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
    confirme_until,
  } = useLoc.state.event;
  const navigate = useNavigate();
  const toast = useToast();
  const iduser = localStorage.getItem("dd");
  const [participants, setParticipants] = useState([] || null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (id: number) => {
    try {
      await Promise.all([
        EventService.deleteEvent(id),
        navigate("/events", { replace: true }),
      ]);
      toast({
        title: "Evento deletado com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Erro ao deletar o evento.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const fetchParticipants = async () => {
      setIsLoading(true);
      try {
        const { data } = await EventService.getParticipants({ id_event: id });
        setParticipants(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchParticipants();
  }, [id]);
  const handleAddParticipant = async () => {
    const { addUserToEvent } = EventService;

    const currentUser = localStorage.getItem("given_name");
    if (currentUser && currentUser !== created_by) {
      const id_user = +localStorage.getItem("dd");
      const name_participant = currentUser;

      try {
        const res = await addUserToEvent({
          id_event: id,
          id_user,
          name_participant,
        });

        if (res.status === 200) {
          setParticipants((prevParticipants) => [
            ...prevParticipants,
            { name_participant },
          ]);

          toast({
            title: res.msg,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            title: res.msg,
            status: "error",
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
        <Flex>
          <EventInfo fontSize="lg" mb={4}>
            <strong>Data:</strong> {date}
          </EventInfo>
          <EventInfo fontSize="lg" mb={4} marginLeft={"40px"}>
            <strong>Data/Confirmação:</strong> {confirme_until}
          </EventInfo>
        </Flex>
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
        {id_user === parseInt(iduser) && (
          <Flex justify="flex-end">
            <StyledButton onClick={handleModalOpen}>
              Visualizar Participantes
            </StyledButton>
          </Flex>
        )}
      </EventDetails>
      <StyledButton onClick={() => navigate("/events")}>
        <ArrowBackIcon />
      </StyledButton>
      {id_user !== parseInt(iduser) && (
        <StyledButton onClick={handleAddParticipant}>
          Participar do Evento
        </StyledButton>
      )}
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Lista de Participantes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {participants ? (
              <List spacing={3}>
                {participants.map((participant) => (
                  <ListItem
                    key={participant.id} // Use a unique identifier if available
                    py={2}
                    px={4}
                    borderRadius="md"
                    bg="gray.100"
                  >
                    {participant.name_participant}
                  </ListItem>
                ))}
              </List>
            ) : (
              <Text>Nenhum participante registrado.</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleModalClose}
              variant="outline"
            >
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default EventDetailPage;

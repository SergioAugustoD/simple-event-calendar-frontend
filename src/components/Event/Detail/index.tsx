import { ArrowBackIcon } from "@chakra-ui/icons";
import { CircularProgress, Flex, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiMap } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { EventService } from "services/EventService";
import ParticipantModal from "../Participants";
import { Container, DeleteButton, EventInfo, StyledButton } from "./styles";

const EventDetails: React.FC = () => {
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
  const idUser = localStorage.getItem("dd");
  const navigate = useNavigate();
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [participants, setParticipants] = useState([] || null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchParticipants = async () => {
      setIsLoading(true);
      try {
        const participantsResponse = await EventService.getParticipants({
          id_event: id,
        });

        setParticipants(participantsResponse);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchParticipants();
  }, [id]);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const handleAddParticipant = async () => {
    const { addUserToEvent } = EventService;
    const currentUser = localStorage.getItem("given_name");
    const currentUserId = +localStorage.getItem("dd");

    if (currentUser && currentUser !== created_by) {
      try {
        const res = await addUserToEvent({
          id_event: id,
          id_user: currentUserId,
          name_participant: currentUser,
        });

        const status = res.status;
        const isSuccessful = status === 200;

        if (isSuccessful) {
          const participant = {
            name: currentUser,
          };
          toast({ title: res.msg, status: "success" });
        } else {
          toast({ title: res.msg, status: "error" });
        }
      } catch (error) {
        toast({ title: error, status: "success" });
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const [deletedEvent] = await Promise.all([
        EventService.deleteEvent(id),
        navigate("/events", { replace: true }),
      ]);
      toast({ title: "Evento deletado com sucesso!", status: "success" });
    } catch (error) {
      toast({ title: "Erro ao deletar evento.", status: "success" });
    }
  };
  return (
    <Container p={4} borderWidth={1} borderRadius="md" shadow="md">
      <ParticipantModal
        participants={participants}
        isOpen={isModalOpen}
        handleClose={handleModalClose}
      />
      {isLoading && (
        <CircularProgress alignSelf="center" size="70px" isIndeterminate />
      )}
      <EventInfo fontSize="lg">
        <strong>Título:</strong> {title}
        <strong style={{ marginLeft: "25px" }}>Categoria:</strong> {category}
      </EventInfo>
      <Flex>
        <EventInfo fontSize="lg">
          <strong>Data:</strong> {date}
        </EventInfo>
        <EventInfo fontSize="lg" marginLeft="40px">
          <strong>Data/Confirmação:</strong> {confirme_until}
        </EventInfo>
      </Flex>
      <EventInfo fontSize="lg">
        <strong>Descrição:</strong> {description}
      </EventInfo>
      <EventInfo fontSize="lg">
        <strong>Localização:</strong> {location}
      </EventInfo>
      <EventInfo fontSize="lg" display="flex" flexDirection="row">
        <strong>Mapa: </strong>
        <a
          href={`https://www.google.com.br/maps/place/${location}`}
          target="_blank"
        >
          <BiMap size={24} color="red" />
        </a>
        <strong style={{ marginLeft: "25px" }}>Autor:</strong> {created_by}
      </EventInfo>
      {id_user === parseInt(idUser) && (
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
      {id_user === parseInt(idUser) && (
        <Flex justify="flex-end">
          <StyledButton onClick={handleModalOpen}>
            Visualizar Participantes
          </StyledButton>
        </Flex>
      )}
      <Flex>
        <StyledButton onClick={() => navigate("/events")}>
          <ArrowBackIcon />
        </StyledButton>
        {id_user !== parseInt(idUser) && (
          <StyledButton onClick={handleAddParticipant}>
            Participar do Evento
          </StyledButton>
        )}
      </Flex>
    </Container>
  );
};

export default EventDetails;

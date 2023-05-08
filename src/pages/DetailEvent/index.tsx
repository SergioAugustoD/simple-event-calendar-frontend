import { Box, Button, Heading, Text, useToast } from "@chakra-ui/react";
import { IEvent } from "interfaces/IEvent";
import { AiFillDelete } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { EventService } from "services/EventService";

const EventDetailPage: React.FC = () => {
  const useLoc = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const { id_user, id, title, date, description, location } =
    useLoc.state.event;
  const iduser = localStorage.getItem("dd");

  const handleDelete = async (id: number) => {
    await EventService.deleteEvent(id).then((e) => {
      toast({
        title: e.msg,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/events", { replace: true });
    });
  };
  console.log(useLoc.state);
  return (
    <Box>
      <Heading as="h1" size="xl" mb={4}>
        Detalhes do Evento
      </Heading>
      <Box p={4} borderWidth={1} borderRadius="md" shadow="md">
        <Text fontSize="lg" mb={2}>
          Título: {title}
        </Text>
        <Text fontSize="lg" mb={2}>
          Data: {date}
        </Text>
        <Text fontSize="lg">Descrição: {description}</Text>
        <Text fontSize="lg">Localização: {location}</Text>
        {id_user === parseInt(iduser) && (
          <Box padding={5}>
            <Button onClick={() => handleDelete(id)}>
              {<AiFillDelete color="red" />}
            </Button>
          </Box>
        )}
      </Box>
      <Button onClick={() => navigate("/events", { replace: true })}>
        Voltar
      </Button>
    </Box>
  );
};

export default EventDetailPage;

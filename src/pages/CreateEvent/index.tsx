import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { IEvent } from "interfaces/IEvent";
import { EventService } from "services/EventService";
import useLogin from "hooks/useLogin";
import { useNavigate } from "react-router-dom";

type Event = {
  id: number;
  title: string;
  date: string;
  description: string;
};

const CreateEventPage: React.FC = () => {
  const [dataEvent, setDataEvent] = useState<IEvent>({});
  const { session } = useLogin();
  const navigate = useNavigate();

  const toast = useToast();

  const handleCreateEvent = async () => {
    // lógica para criar um novo evento
    const response = await EventService.createEvent({
      ...dataEvent,
      id_user: parseInt(localStorage.getItem("dd")),
    });

    if (response.status === 200) {
      toast({
        title: response.msg,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Limpar os campos após criar o evento
      setDataEvent({ date: "", description: "", title: "", location: "" });
    }
    if (response.err) {
      toast({
        title: response.msg,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
      <Heading size="lg" mb={4}>
        Criar Evento
      </Heading>

      <FormControl mb={4}>
        <FormLabel>Título</FormLabel>
        <Input
          name="title"
          value={dataEvent.title || ""}
          onChange={(e) =>
            setDataEvent({ ...dataEvent, title: e.target.value })
          }
          placeholder="Digite o título do evento"
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Data</FormLabel>
        <Input
          name="date"
          value={dataEvent.date || ""}
          type="date"
          onChange={(e) => setDataEvent({ ...dataEvent, date: e.target.value })}
          placeholder="Digite a data do evento"
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Descrição</FormLabel>
        <Textarea
          name="description"
          value={dataEvent.description || ""}
          onChange={(e) =>
            setDataEvent({ ...dataEvent, description: e.target.value })
          }
          placeholder="Digite a descrição do evento"
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Localização</FormLabel>
        <Textarea
          name="location"
          value={dataEvent.location || ""}
          onChange={(e) =>
            setDataEvent({ ...dataEvent, location: e.target.value })
          }
          placeholder="Digite a localização do evento"
        />
      </FormControl>

      <Button colorScheme="blue" onClick={handleCreateEvent}>
        Criar Evento
      </Button>
      <Button onClick={() => navigate("/events")}>Voltar</Button>
    </Box>
  );
};

export default CreateEventPage;

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

type Event = {
  id: number;
  title: string;
  date: string;
  description: string;
};

const CreateEventPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const toast = useToast();

  const handleCreateEvent = () => {
    // Aqui você pode adicionar a lógica para criar um novo evento
    const newEvent: Event = {
      id: Date.now(),
      title,
      date,
      description,
    };

    // Exemplo de exibição de uma mensagem de sucesso usando o toast do Chakra UI
    toast({
      title: "Evento criado com sucesso!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    // Limpar os campos após criar o evento
    setTitle("");
    setDate("");
    setDescription("");
  };

  return (
    <Box p={4}>
      <Heading size="lg" mb={4}>
        Criar Evento
      </Heading>

      <FormControl mb={4}>
        <FormLabel>Título</FormLabel>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Digite o título do evento"
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Data</FormLabel>
        <Input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Digite a data do evento"
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Descrição</FormLabel>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Digite a descrição do evento"
        />
      </FormControl>

      <Button colorScheme="blue" onClick={handleCreateEvent}>
        Criar Evento
      </Button>
    </Box>
  );
};

export default CreateEventPage;

import React from "react";
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
import { useForm } from "react-hook-form";
import { EventService } from "services/EventService";
import useLogin from "hooks/useLogin";
import { useNavigate } from "react-router-dom";

type Event = {
  id: number;
  title: string;
  date: string;
  description: string;
  location: string;
};

const CreateEventPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Event>();
  const { session } = useLogin();
  const navigate = useNavigate();

  const toast = useToast();

  const handleCreateEvent = async (data: Event) => {
    try {
      const response = await EventService.createEvent({
        ...data,
        id_user: parseInt(localStorage.getItem("dd") || ""),
      });

      if (response.status === 200) {
        toast({
          title: response.msg,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        reset();
      } else {
        toast({
          title: response.msg,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao criar o evento.",
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

      <form onSubmit={handleSubmit(handleCreateEvent)}>
        <FormControl mb={4}>
          <FormLabel>Título</FormLabel>
          <Input
            {...register("title", { required: true })}
            placeholder="Digite o título do evento"
          />
          {errors.title && (
            <Box color="red" mt={1}>
              Campo obrigatório.
            </Box>
          )}
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Data</FormLabel>
          <Input
            {...register("date", { required: true })}
            type="date"
            placeholder="Digite a data do evento"
          />
          {errors.date && (
            <Box color="red" mt={1}>
              Campo obrigatório.
            </Box>
          )}
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Descrição</FormLabel>
          <Textarea
            {...register("description", { required: true })}
            placeholder="Digite a descrição do evento"
          />
          {errors.description && (
            <Box color="red" mt={1}>
              Campo obrigatório.
            </Box>
          )}
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Localização</FormLabel>
          <Textarea
            {...register("location", { required: true })}
            placeholder="Digite a localização do evento"
          />
          {errors.location && (
            <Box color="red" mt={1}>
              Campo obrigatório.
            </Box>
          )}
        </FormControl>

        <Button
          colorScheme="blue"
          type="submit"
          isLoading={isSubmitting}
          mr={2}
        >
          Criar Evento
        </Button>
        <Button onClick={() => navigate("/events")}>Voltar</Button>
      </form>
    </Box>
  );
};

export default CreateEventPage;

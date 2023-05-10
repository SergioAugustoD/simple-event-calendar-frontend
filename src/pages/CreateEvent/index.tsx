import React from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { EventService } from "services/EventService";
import useLogin from "hooks/useLogin";
import { useNavigate } from "react-router-dom";
import {
  Container,
  CreateEventHeading,
  ErrorBox,
  Form,
  StyledButton,
} from "./styles";

type Event = {
  id: number;
  title: string;
  date: string;
  description: string;
  location: string;
  locationCEP: string;
  locationNumber: string;
  locationCity: string;
  category: string;
};

const CreateEventPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Event>();
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
    <Container>
      <CreateEventHeading>Criar Evento</CreateEventHeading>

      <Form onSubmit={handleSubmit(handleCreateEvent)}>
        <Flex mb={4} justifyContent="space-between">
          <FormControl>
            <FormLabel>Título</FormLabel>
            <Input
              {...register("title", { required: true })}
              placeholder="Digite o título do evento"
            />
            {errors.title && <ErrorBox>Campo obrigatório.</ErrorBox>}
          </FormControl>
          <FormControl>
            <FormLabel>Categoria</FormLabel>
            <Input
              {...register("category", { required: true })}
              placeholder="Digite a categoria do evento"
            />
            {errors.title && <ErrorBox>Campo obrigatório.</ErrorBox>}
          </FormControl>
          <FormControl>
            <FormLabel>Data</FormLabel>
            <Input
              {...register("date", { required: true })}
              type="date"
              placeholder="Digite a data do evento"
            />
            {errors.date && <ErrorBox>Campo obrigatório.</ErrorBox>}
          </FormControl>
        </Flex>

        <FormControl mb={4}>
          <FormLabel>Descrição</FormLabel>
          <Textarea
            {...register("description", { required: true })}
            placeholder="Digite a descrição do evento"
          />
          {errors.description && <ErrorBox>Campo obrigatório.</ErrorBox>}
        </FormControl>

        <Flex mb={2}>
          <FormControl flex={1} mr={4}>
            <FormLabel>Rua</FormLabel>
            <Input
              {...register("location", { required: true })}
              placeholder="Rua"
            />
            {errors.location && <ErrorBox>Campo obrigatório.</ErrorBox>}
          </FormControl>

          <FormControl flex={1} mr={4}>
            <FormLabel>Número</FormLabel>
            <Input
              {...register("locationNumber", { required: true })}
              placeholder="Número"
            />
            {errors.locationNumber && <ErrorBox>Campo obrigatório.</ErrorBox>}
          </FormControl>

          <FormControl flex={1} mr={4}>
            <FormLabel>Cidade</FormLabel>
            <Input
              {...register("locationCity", { required: true })}
              placeholder="Cidade"
            />
            {errors.locationCity && <ErrorBox>Campo obrigatório.</ErrorBox>}
          </FormControl>

          <FormControl flex={1}>
            <FormLabel>CEP</FormLabel>
            <Input
              {...register("locationCEP", { required: false })}
              placeholder="CEP"
            />
            {errors.locationCEP && <ErrorBox>Campo obrigatório.</ErrorBox>}
          </FormControl>
        </Flex>

        <Flex>
          <StyledButton
            colorScheme="blue"
            type="submit"
            isLoading={isSubmitting}
            mr={2}
          >
            Criar Evento
          </StyledButton>
          <Button onClick={() => navigate("/events")}>Voltar</Button>
        </Flex>
      </Form>
    </Container>
  );
};

export default CreateEventPage;

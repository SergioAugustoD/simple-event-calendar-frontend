import React from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  Box,
  Heading,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { EventService } from "services/EventService";
import { useNavigate } from "react-router-dom";
import { Container, ErrorBox, Form, StyledButton } from "./styles";
import { IEvent } from "interfaces/IEvent";

const CreateEventPage: React.FC = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IEvent>();
  const navigate = useNavigate();
  const toast = useToast();

  const handleCreateEvent = async (data: IEvent) => {
    const res = await EventService.createEvent({
      ...data,
      id_user: parseInt(localStorage.getItem("dd") || ""),
    });

    toast({
      title: res.msg,
      status: res.status === 200 ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
    reset();
  };

  return (
    <Container>
      <Box maxWidth="500px" margin="0 auto">
        <Heading as="h1" textAlign="center" size="xl" mb={8}>
          Criar Evento
        </Heading>
        <Form onSubmit={handleSubmit(handleCreateEvent)}>
          <FormControl mb={4}>
            <FormLabel>Título</FormLabel>
            <Input
              {...register("title", { required: true })}
              placeholder="Título do evento"
            />
            {errors.title && <ErrorBox>Campo obrigatório</ErrorBox>}
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Categoria</FormLabel>
            <Input
              {...register("category", { required: true })}
              placeholder="Categoria do evento"
            />
            {errors.category && <ErrorBox>Campo obrigatório</ErrorBox>}
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Data</FormLabel>
            <Input
              {...register("date", { required: true })}
              type="datetime-local"
              placeholder="Data do evento"
            />
            {errors.date && <ErrorBox>Campo obrigatório</ErrorBox>}
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Data/Confirmação</FormLabel>
            <Input
              {...register("confirme_until", { required: true })}
              type="datetime-local"
              placeholder="Confirmação do evento"
            />
            {errors.confirme_until && <ErrorBox>Campo obrigatório</ErrorBox>}
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Descrição</FormLabel>
            <Textarea
              {...register("description", { required: true })}
              placeholder="Descrição do evento"
            />
            {errors.description && <ErrorBox>Campo obrigatório</ErrorBox>}
          </FormControl>
          <Flex mb={4}>
            <FormControl flex={1} mr={4}>
              <FormLabel>Rua</FormLabel>
              <Input
                {...register("location", { required: true })}
                placeholder="Rua"
              />
              {errors.location && <ErrorBox>Campo obrigatório</ErrorBox>}
            </FormControl>

            <FormControl flex={1} mr={4}>
              <FormLabel>Número</FormLabel>
              <Input
                {...register("locationNumber", { required: true })}
                placeholder="Número"
              />
              {errors.locationNumber && <ErrorBox>Campo obrigatório</ErrorBox>}
            </FormControl>

            <FormControl flex={1} mr={4}>
              <FormLabel>Cidade</FormLabel>
              <Input
                {...register("locationCity", { required: true })}
                placeholder="Cidade"
              />
              {errors.locationCity && <ErrorBox>Campo obrigatório</ErrorBox>}
            </FormControl>

            <FormControl flex={1}>
              <FormLabel>CEP</FormLabel>
              <Input {...register("locationCEP")} placeholder="CEP" />
              {errors.locationCEP && <ErrorBox>Campo obrigatório</ErrorBox>}
            </FormControl>
          </Flex>

          <Flex justifyContent="space-between">
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
      </Box>
    </Container>
  );
};

export default CreateEventPage;

import { Button, Flex, useToast } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { IEvent } from "interfaces/IEvent";
import { instance } from "providers/api";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { EventService } from "services/EventService";
import {
  Container,
  ErrorBox,
  Form,
  FormControl,
  FormLabel,
  Heading,
  Input,
  StyledButton,
  Textarea,
} from "./styles";

const CreateEventPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { nextStep, prevStep, activeStep } = useSteps({
    initialStep: 0,
  });

  const {
    handleSubmit,
    register,
    reset,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IEvent>();

  const handleCreateEvent = async (data: IEvent) => {
    const res = await EventService.createEvent({
      ...data,
      id_user: parseInt(localStorage.getItem("dd") || ""),
    });

    if (res.status === 200) {
      toast({ title: res.msg, status: "success" });
    } else {
      toast({ title: res.msg, status: "error" });
    }
    reset();
  };

  const handleCep = async () => {
    try {
      const response = await instance.get(
        `https://viacep.com.br/ws/${getValues("locationCEP")}/json/`
      );

      setValue("location", response.data.logradouro);
      setValue("locationCity", response.data.localidade);
      setValue("locationCEP", response.data.cep);
      setValue("district", response.data.bairro);
      setValue("uf", response.data.uf);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(activeStep);
  const steps = [
    {
      label: "Informações do Evento",
      content: (
        <>
          <FormControl>
            <FormLabel>Título</FormLabel>
            <Input
              {...register("title", { required: true })}
              placeholder="Título do evento"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Categoria</FormLabel>
            <Input
              {...register("category", { required: true })}
              placeholder="Categoria do evento"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Data</FormLabel>
            <Input
              {...register("date", { required: true })}
              type="datetime-local"
              placeholder="Data do evento"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Data/Confirmação</FormLabel>
            <Input
              {...register("confirme_until", { required: true })}
              type="datetime-local"
              placeholder="Confirmação do evento"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Descrição</FormLabel>
            <Textarea
              {...register("description", { required: true })}
              placeholder="Descrição do evento"
            />
          </FormControl>
          {(errors.category ||
            errors.confirme_until ||
            errors.date ||
            errors.description ||
            errors.title) && <ErrorBox>Preencha todos os campos</ErrorBox>}
        </>
      ),
    },
    {
      label: "Informações do Endereço",
      content: (
        <>
          <FormControl>
            <FormLabel>CEP</FormLabel>
            <Input
              {...register("locationCEP")}
              placeholder="CEP"
              onBlur={handleCep}
            />
            {errors.locationCEP && <ErrorBox>Campo obrigatório</ErrorBox>}
          </FormControl>

          <FormControl>
            <FormLabel>Rua</FormLabel>
            <Input
              {...register("location", { required: true })}
              placeholder="Rua"
            />
            {errors.location && <ErrorBox>Campo obrigatório</ErrorBox>}
          </FormControl>

          <FormControl>
            <FormLabel>Número</FormLabel>
            <Input
              {...register("locationNumber", { required: true })}
              placeholder="Número"
            />
            {errors.locationNumber && <ErrorBox>Campo obrigatório</ErrorBox>}
          </FormControl>

          <FormControl>
            <FormLabel>Bairro</FormLabel>
            <Input
              {...register("district", { required: true })}
              placeholder="Bairro"
            />
            {errors.district && <ErrorBox>Campo obrigatório</ErrorBox>}
          </FormControl>

          <FormControl>
            <FormLabel>Cidade</FormLabel>
            <Input
              {...register("locationCity", { required: true })}
              placeholder="Cidade"
            />
            {errors.locationCity && <ErrorBox>Campo obrigatório</ErrorBox>}
          </FormControl>

          <FormControl>
            <FormLabel>UF</FormLabel>
            <Input {...register("uf", { required: true })} placeholder="UF" />
            {errors.uf && <ErrorBox>Campo obrigatório</ErrorBox>}
          </FormControl>
        </>
      ),
    },
  ];
  return (
    <Container>
      <Heading>Criar Evento</Heading>
      <Form>
        <Steps activeStep={activeStep} responsive>
          {steps.map(({ label, content }) => (
            <Step label={label} key={label}>
              {content}
            </Step>
          ))}
        </Steps>
        <Flex justify="space-between">
          <Button
            isDisabled={activeStep === 0}
            mr={4}
            onClick={prevStep}
            variant="ghost"
          >
            Prev
          </Button>
          <Button
            onClick={
              activeStep == 2 ? handleSubmit(handleCreateEvent) : nextStep
            }
          >
            {activeStep === 2 ? "Finish" : "Next"}
          </Button>
          <StyledButton type="submit">Criar Evento</StyledButton>
        </Flex>
      </Form>
    </Container>
  );
};

export default CreateEventPage;

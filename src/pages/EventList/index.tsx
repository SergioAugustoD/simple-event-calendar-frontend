import {
  Button,
  CircularProgress,
  Flex,
  Heading,
  Input,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import EventItem from "components/Event/EventItem";
import { IEvent } from "interfaces/IEvent";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { BsArrowLeft, BsArrowRight, BsPlus } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { EventService } from "services/EventService";
import { Container, CreateButton } from "./styles";

interface EventListPageProps {}

const EventListPage: React.FC<EventListPageProps> = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<IEvent[]>([]);
  const [page, setPage] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleCreate = (): void => {
    navigate("/create-event");
  };

  const handleNext = (): void => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevious = (): void => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setSearchTerm(event.target.value);
    },
    []
  );

  useEffect(() => {
    const fetchEvents = async (): Promise<void> => {
      try {
        const data: IEvent[] = await EventService.listEvents();
        setEvents(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar os eventos:", error);
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Container>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading as="h1" size="lg">
          Lista de Eventos
        </Heading>
        <Tooltip label="Criar evento">
          <CreateButton onClick={handleCreate} leftIcon={<BsPlus size={24} />}>
            Criar Evento
          </CreateButton>
        </Tooltip>
      </Flex>
      <Input
        placeholder="Buscar evento por título, descrição, data ou localização"
        value={searchTerm}
        onChange={handleSearch}
        mb={4}
      />
      {isLoading ? (
        <Flex justify="center" align="center" height="300px">
          <CircularProgress isIndeterminate />
        </Flex>
      ) : (
        <>
          {events.length > 0 ? (
            <>
              <EventItem
                events={events}
                navigate={navigate}
                page={page}
                searchTerm={searchTerm}
              />
              <Flex justify="center" mt={4}>
                {page > 0 && (
                  <Button
                    onClick={handlePrevious}
                    leftIcon={<BsArrowLeft size={24} />}
                    variant="outline"
                    colorScheme="teal"
                    mr={2}
                  >
                    Anterior
                  </Button>
                )}
                {events.length > (page + 1) * 12 && (
                  <Button
                    onClick={handleNext}
                    rightIcon={<BsArrowRight size={24} />}
                    variant="outline"
                    colorScheme="teal"
                  >
                    Próximo
                  </Button>
                )}
              </Flex>
            </>
          ) : (
            <Text>Nenhum evento encontrado</Text>
          )}
        </>
      )}
    </Container>
  );
};

export default EventListPage;

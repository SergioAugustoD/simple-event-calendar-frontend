import React, { useEffect, useState, ChangeEvent, useCallback } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Text,
  Tooltip,
  Input,
  Progress,
  CircularProgress,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { EventService } from "services/EventService";
import styled from "styled-components";
import { BsArrowLeft, BsArrowRight, BsPlus } from "react-icons/bs";
import { IEvent } from "interfaces/IEvent";
import {
  Container,
  CreateButton,
  EventCard,
  EventCardContent,
  EventInfo,
  EventTitle,
} from "./styles";

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

  const renderEvents = (): React.ReactNode => {
    let filteredEvents: IEvent[] = events;

    if (searchTerm) {
      const searchTermLowerCase: string = searchTerm.toLowerCase();
      filteredEvents = events.filter((event) =>
        Object.values(event).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchTermLowerCase)
        )
      );
    }

    const startIndex: number = page * 12;
    const endIndex: number = startIndex + 12;
    const currentEvents: IEvent[] = filteredEvents.slice(startIndex, endIndex);

    return (
      <Grid templateColumns="repeat(4, 1fr)" gap={4}>
        {currentEvents.map((event: IEvent) => (
          <EventCard
            key={event.id}
            onClick={() =>
              navigate(`/event-detail/${event.id}`, { state: { event } })
            }
          >
            <EventCardContent>
              <EventTitle as="h2">{event.title}</EventTitle>
              <EventInfo>{event.date}</EventInfo>
              <EventInfo>{event.category}</EventInfo>
              <Text>{event.description}</Text>
              <Text>{event.location}</Text>
              <Text>
                <strong>Author:</strong> {event.created_by}
              </Text>
            </EventCardContent>
          </EventCard>
        ))}
      </Grid>
    );
  };

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
              {renderEvents()}
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

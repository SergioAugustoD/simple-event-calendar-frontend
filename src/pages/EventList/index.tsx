import React, { Suspense, useEffect, useState } from "react";
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
import { ComponentsEventCard, EventCard } from "./styles";
import { BsArrowLeft, BsArrowRight, BsPlus } from "react-icons/bs";
import { IEvent } from "interfaces/IEvent";

const EventListPage: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<IEvent[]>([]);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleCreate = () => {
    navigate("/create-event");
  };

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevious = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await EventService.listEvents();
        setEvents(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar os eventos:", error);
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const renderEvents = () => {
    let filteredEvents = events;

    if (searchTerm) {
      const searchTermLowerCase = searchTerm.toLowerCase();
      filteredEvents = events.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTermLowerCase) ||
          event.description.toLowerCase().includes(searchTermLowerCase) ||
          event.location.toLowerCase().includes(searchTermLowerCase) ||
          event.date.toLowerCase().includes(searchTermLowerCase) ||
          event.created_by.toLowerCase().includes(searchTermLowerCase)
      );
    }

    const startIndex = page * 12;
    const endIndex = startIndex + 12;
    const currentEvents = filteredEvents.slice(startIndex, endIndex);

    return currentEvents.map((event) => (
      <EventCard
        boxShadow="md"
        width={"28.64vw"}
        key={event.id}
        onClick={() =>
          navigate(`/event-detail/${event.id}`, { state: { event } })
        }
      >
        <ComponentsEventCard>
          <Heading size="md">{event.title}</Heading>
          <Flex>
            <Text>{event.date}</Text>
            <Text marginLeft={5}>{event.category}</Text>
          </Flex>
          <Text>{event.description}</Text>
          <Text>{event.location}</Text>
          <Text size="sm">
            <strong>Autor: </strong>
            {event.created_by}
          </Text>
        </ComponentsEventCard>
      </EventCard>
    ));
  };

  return (
    <Box p={4} display="flex" flexDirection="column" alignItems="flex-start">
      <Flex justify="flex-start" mt={4} margin={4}>
        <Heading size="lg" mb={4}>
          Lista de Eventos
        </Heading>
        <Tooltip label="Criar evento">
          <Button onClick={handleCreate} marginLeft={10}>
            <BsPlus size={45} />
          </Button>
        </Tooltip>
        <Input
          placeholder="Buscar evento por título, descrição, data ou localização"
          marginLeft={10}
          value={searchTerm}
          onChange={handleSearch}
          width="450px"
        />
      </Flex>
      <Suspense
        fallback={
          <CircularProgress alignSelf={"center"} size="70px" isIndeterminate />
        }
      >
        {isLoading ? (
          <CircularProgress alignSelf={"center"} size="70px" isIndeterminate />
        ) : (
          <Flex justify="flex-start" mt={4}>
            {events.length > 0 ? (
              <Grid templateColumns="          repeat(3, 1fr)" gap={4}>
                {renderEvents()}
              </Grid>
            ) : (
              <Text>Nenhum evento encontrado</Text>
            )}
            {page > 0 && (
              <Button
                onClick={handlePrevious}
                mr={2}
                leftIcon={<BsArrowLeft size={24} />}
              />
            )}
            {events.length > (page + 1) * 12 && (
              <Button
                onClick={handleNext}
                leftIcon={<BsArrowRight size={24} />}
              />
            )}
          </Flex>
        )}
      </Suspense>
    </Box>
  );
};

export default EventListPage;

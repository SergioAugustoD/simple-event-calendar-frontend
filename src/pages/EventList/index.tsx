import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Text,
  Tooltip,
  Input,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { EventService } from "services/EventService";
import { ComponentsEventCard, EventCard } from "./styles";
import { BsArrowLeft, BsArrowRight, BsPlus } from "react-icons/bs";

const EventListPage: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([] || null);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCreate = () => {
    navigate("/create-event");
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  const handlePrevious = () => {
    setPage(page - 1);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const listEvent = async () => {
      const data = await EventService.listEvents();
      setEvents(data);
    };
    listEvent();
  }, []);

  const renderEvents = () => {
    let filteredEvents = events;

    if (searchTerm) {
      filteredEvents = events.filter(
        (event) =>
          event.title.includes(searchTerm.toLowerCase()) ||
          event.description.includes(searchTerm.toLowerCase()) ||
          event.location.includes(searchTerm.toLowerCase()) ||
          event.date.includes(searchTerm.toLowerCase())
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
    <Box
      p={4}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"flex-start"}
    >
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
      <Flex justify="flex-start" mt={4}>
        {events && events.length > 0 ? (
          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
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
        {events && events.length > (page + 1) * 12 && (
          <Button onClick={handleNext} leftIcon={<BsArrowRight size={24} />} />
        )}
      </Flex>
    </Box>
  );
};

export default EventListPage;

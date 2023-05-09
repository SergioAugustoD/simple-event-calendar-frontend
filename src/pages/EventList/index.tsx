import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { EventService } from "services/EventService";

const EventListPage: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([] || null);

  const handleCreate = () => {
    navigate("/create-event");
  };

  useEffect(() => {
    const listEvent = async () => {
      const data = await EventService.listEvents();
      setEvents(data);
    };
    listEvent();
  }, []);

  const renderEvents = () => {
    const renderedEvents: JSX.Element[] = [];
    let row: JSX.Element[] = [];

    for (let i = 0; i < events.length; i++) {
      const event = events[i];

      row.push(
        <Box
          key={event.id}
          borderWidth="1px"
          borderRadius="md"
          p={4}
          onClick={() =>
            navigate(`/event-detail/${event.id}`, { state: { event } })
          }
          cursor="pointer"
          width="33.33%"
          flexGrow={0}
        >
          <Heading size="md">{event.title}</Heading>
          <Text>{event.date}</Text>
          <Text>{event.description}</Text>
        </Box>
      );

      if ((i + 1) % 3 === 0 || i === events.length - 1) {
        renderedEvents.push(
          <Flex key={i} mt={4}>
            {row}
          </Flex>
        );
        row = [];
      }
    }

    return renderedEvents;
  };

  return (
    <Box p={4}>
      <Heading size="lg" mb={4}>
        Lista de Eventos
      </Heading>
      {events.length ? (
        <Stack spacing={4}>{renderEvents()}</Stack>
      ) : (
        <Text>Nenhum evento encontrado</Text>
      )}
      <Flex justify="flex-start" mt={4}>
        <Button onClick={handleCreate}>Criar</Button>
      </Flex>
    </Box>
  );
};

export default EventListPage;

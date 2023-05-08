import React, { useEffect, useState } from "react";
import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
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
      await EventService.listEvents().then((data) => setEvents(data));
    };
    listEvent();
  }, []);

  return (
    <Box p={4}>
      <Heading size="lg" mb={4}>
        Lista de Eventos
      </Heading>
      <Stack spacing={4} shouldWrapChildren>
        {!events && <Text>Nenhum evento encontrado</Text>}
        {events &&
          events.map((event) => (
            <Box
              key={event.id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              onClick={() =>
                navigate(`/event-detail/${event.id}`, { state: { event } })
              }
            >
              <Heading size="md">{event.title}</Heading>
              <Text>{event.date}</Text>
              <Text>{event.description}</Text>
            </Box>
          ))}
      </Stack>
      <Button marginTop={4} onClick={handleCreate}>
        Criar
      </Button>
    </Box>
  );
};

export default EventListPage;

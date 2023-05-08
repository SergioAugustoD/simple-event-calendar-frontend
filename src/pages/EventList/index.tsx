import React from "react";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";

type Event = {
  id: number;
  title: string;
  date: string;
  description: string;
};

const events: Event[] = [
  {
    id: 1,
    title: "Evento 1",
    date: "2023-05-10",
    description: "Descrição do Evento 1",
  },
  {
    id: 2,
    title: "Evento 2",
    date: "2023-05-15",
    description: "Descrição do Evento 2",
  },
  // ... outros eventos
];

const EventListPage: React.FC = () => {
  return (
    <Box p={4}>
      <Heading size="lg" mb={4}>
        Lista de Eventos
      </Heading>

      <Stack spacing={4}>
        {events.map((event) => (
          <Box key={event.id} p={4} borderWidth="1px" borderRadius="md">
            <Heading size="md">{event.title}</Heading>
            <Text>{event.date}</Text>
            <Text>{event.description}</Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default EventListPage;

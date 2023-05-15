import { Box, Button, Flex, Text, Tooltip } from "@chakra-ui/react";
import { IEvent } from "interfaces/IEvent";
import React from "react";
import { BiMap } from "react-icons/bi";
import { dateFormat } from "util/dateFormat";
import { EventItem, EventTitle } from "./styles";

interface EventListProps {
  currentEvents: IEvent[];
  handleConfirm: (data: any) => void;
}

const EventList: React.FC<EventListProps> = ({
  currentEvents,
  handleConfirm,
}) => {
  const dateNow = dateFormat(new Date());

  return (
    <>
      {currentEvents?.map((event) => (
        <EventItem key={event.id}>
          <EventTitle>{event.title}</EventTitle>
          <Box>
            <Flex mb={2}>
              <strong>Data:</strong>
              <Text ml={2}>{event.date}</Text>
            </Flex>
            <Flex mb={2}>
              <strong>Data/Confirmação:</strong>
              <Text ml={2}>{event.confirme_until}</Text>
            </Flex>
            <Flex mb={2}>
              <strong>Descrição:</strong>
              <Text ml={2}>{event.description}</Text>
            </Flex>
            <Flex alignItems="center">
              <strong>Localização:</strong>
              <a
                href={`https://www.google.com.br/maps/place/${event.location}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BiMap size={24} color="red" />
              </a>
            </Flex>
          </Box>
          <Tooltip
            label={
              event.confirmed === "true" ? "Você confirmou este evento" : ""
            }
          >
            <Button
              isDisabled={
                dateNow > event.confirme_until || event.confirmed === "true"
              }
              bg={event.confirmed === "true" ? "green.400" : "gray.300"}
              color={event.confirmed === "true" ? "white" : "gray.800"}
              onClick={() => {
                handleConfirm({
                  name_participant: localStorage.getItem("given_name"),
                  id_user: parseInt(localStorage.getItem("dd")),
                  id_event: event.id,
                  confirme_until: event.confirme_until,
                });
              }}
            >
              {event.confirmed === "true" ? "CONFIRMADO" : "Confirmar Evento"}
            </Button>
          </Tooltip>
        </EventItem>
      ))}
    </>
  );
};

export default EventList;

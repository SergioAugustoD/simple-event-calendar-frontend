import { Grid, Text } from "@chakra-ui/react";
import { IEvent } from "interfaces/IEvent";
import React from "react";
import { EventCard, EventCardContent, EventInfo, EventTitle } from "./styles";

interface EventListProps {
  events: IEvent[];
  searchTerm: string;
  page: number;
  navigate: (path: string, state?: any) => void;
}

const EventItem: React.FC<EventListProps> = ({
  events,
  searchTerm,
  page,
  navigate,
}) => {
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

export default EventItem;

import React from "react";
import styled from "styled-components";

interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
}

interface EventListProps {
  events: Event[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  return (
    <Container>
      <Title>Event List</Title>
      {events.length === 0 ? (
        <Message>No events available</Message>
      ) : (
        <List>
          {events.map((event) => (
            <ListItem key={event.id}>
              <EventTitle>{event.title}</EventTitle>
              <EventDate>{event.date}</EventDate>
              <EventDescription>{event.description}</EventDescription>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

const Container = styled.div`
  margin-top: 20px;
`;

const Title = styled.h2`
  margin-bottom: 10px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 20px;
`;

const EventTitle = styled.h3`
  margin-bottom: 5px;
`;

const EventDate = styled.p`
  margin-bottom: 5px;
  color: #888888;
`;

const EventDescription = styled.p`
  margin-bottom: 5px;
`;

const Message = styled.p`
  text-align: center;
  color: #888888;
`;

export default EventList;

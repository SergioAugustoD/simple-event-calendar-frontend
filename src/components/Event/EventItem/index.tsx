import React from "react";
import styled from "styled-components";

interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
  location: string;
}

interface EventItemProps {
  event: Event;
}

const EventItem: React.FC<EventItemProps> = ({ event }) => {
  return (
    <Container>
      <Title>{event.title}</Title>
      <Date>{event.date}</Date>
      <Description>{event.description}</Description>
      <Location>{event.location}</Location>
    </Container>
  );
};

const Container = styled.div`
  background-color: #f2f2f2;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
`;

const Title = styled.h3`
  margin-bottom: 5px;
`;

const Date = styled.p`
  margin-bottom: 5px;
  color: #888888;
`;

const Description = styled.p`
  margin-bottom: 5px;
`;

const Location = styled.p`
  margin-bottom: 5px;
`;

export default EventItem;

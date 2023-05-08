import EventItem from "components/Event/EventItem";
import EventList from "components/Event/EventList";
import React from "react";

const HomePage: React.FC = () => {
  const events = [
    {
      id: 1,
      title: "Event 1",
      date: "2023-05-10",
      description: "Description of Event 1",
    },
    {
      id: 2,
      title: "Event 2",
      date: "2023-05-15",
      description: "Description of Event 2",
    },
    // Adicione mais eventos, se necessário
  ];

  return (
    <div>
      <h1>Home Page</h1>
      <EventList events={events} />
    </div>
  );
};

export default HomePage;

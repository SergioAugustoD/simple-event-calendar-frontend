import { IEvent } from "interfaces/IEvent";
import { IParticipant } from "interfaces/IParticipants";
import { instance } from "providers/api";

const createEvent = async (data: IEvent) => {
  const response = await instance.post("/events", {
    title: data.title,
    date: data.date,
    description: data.description,
    location: data.location,
    locationNumber: data.locationNumber,
    locationCity: data.locationCity,
    locationCEP: data.locationCEP,
    id_user: data.id_user,
    created_by: localStorage.getItem("given_name"),
    category: "#" + data.category,
    confirme_until: data.confirme_until,
  });
  return response.data;
};

const listEvents = async () => {
  const response = await instance.get("/events");
  if (response.data.status === 404) {
    return [];
  }
  return response.data;
};

const getEvent = async (id: number) => {
  const response = await instance.get(`/events/:${id}`);
  return response.data;
};

const deleteEvent = async (id: number) => {
  const response = await instance.delete(`/events/${id}`);
  return response.data;
};

const getParticipants = async (data: IParticipant) => {
  const response = await instance.post("/events/participants", data);

  return response.data;
};

const addUserToEvent = async (data: IParticipant) => {
  const response = await instance.post("/events/add-user-event", data);

  return response.data;
};

const getEventsParticipant = async (data: IParticipant) => {
  const response = await instance.post("/events/events-participant", data);

  return response.data;
};

const confirmEvent = async (data: {
  name_participant: string;
  id_user: number;
  id_event: number;
  confirmed: string;
  confirme_until: string;
}) => {
  const response = await instance.post("/events/confirm", data);

  return response.data;
};
export const EventService = {
  createEvent,
  listEvents,
  getEvent,
  deleteEvent,
  getParticipants,
  addUserToEvent,
  getEventsParticipant,
  confirmEvent,
};

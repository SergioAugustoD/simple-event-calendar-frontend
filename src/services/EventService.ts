import { IEvent } from "interfaces/IEvent";
import { IParticipant } from "interfaces/IParticipants";
import { instance } from "providers/api";

const createEvent = async (data: IEvent) => {
  const response = await instance.post("/eventos", {
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
  });
  return response.data;
};

const listEvents = async () => {
  const response = await instance.get("/eventos");
  if (response.data.status === 404) {
    return [];
  }
  return response.data;
};

const getEvent = async (id: number) => {
  const response = await instance.get(`/eventos/:${id}`);
  return response.data;
};

const deleteEvent = async (id: number) => {
  const response = await instance.delete(`/eventos/${id}`);
  return response.data;
};

const getParticipants = async (data: IParticipant) => {
  const response = await instance.post("/eventos/participants", data);

  return response.data;
};

const addUserToEvent = async (data: IParticipant) => {
  const response = await instance.post("/eventos/add-user-event", data);

  return response.data;
};
export const EventService = {
  createEvent,
  listEvents,
  getEvent,
  deleteEvent,
  getParticipants,
  addUserToEvent,
};

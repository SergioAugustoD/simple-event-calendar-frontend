import { IEvent } from "interfaces/IEvent";
import { instance } from "providers/api";

const createEvent = async (data: IEvent) => {
  const response = await instance.post("/eventos", {
    title: data.title,
    date: data.date,
    description: data.description,
    location: data.location,
    id_user: data.id_user,
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
export const EventService = {
  createEvent,
  listEvents,
  getEvent,
  deleteEvent,
};

import api from "axios";

export const instance = api.create({ baseURL: "http://localhost:8091/" });

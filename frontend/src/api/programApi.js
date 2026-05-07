import api from "./axios";

export const getProgramsApi = (params) => api.get("/programs", { params });
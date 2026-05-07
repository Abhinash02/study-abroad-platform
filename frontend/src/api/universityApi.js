
import api from "./axios";

export const getUniversitiesApi = (params) => api.get("/universities", { params });
export const getPopularUniversitiesApi = () => api.get("/universities/popular");
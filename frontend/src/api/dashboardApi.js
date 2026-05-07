import api from "./axios";

export const getDashboardOverviewApi = () => api.get("/dashboard/overview");
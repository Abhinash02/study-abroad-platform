import api from "./axios";

export const getSupportRequestsApi = (params) => api.get("/support", { params });
export const createSupportRequestApi = (payload) => api.post("/support", payload);
export const updateSupportRequestApi = (id, payload) => api.patch(`/support/${id}`, payload);
export const deleteSupportRequestApi = (id) => api.delete(`/support/${id}`);
export const addSupportMessageApi = (id, payload) =>
  api.post(`/support/${id}/messages`, payload);
export const updateSupportFeedbackApi = (id, payload) =>
  api.patch(`/support/${id}/feedback`, payload);
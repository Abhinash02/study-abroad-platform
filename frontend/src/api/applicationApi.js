// import api from "./axios";

// export const getApplicationsApi = (params) => api.get("/applications", { params });
// export const createApplicationApi = (payload) => api.post("/applications", payload);
// export const updateApplicationStatusApi = (id, payload) =>
//   api.patch(`/applications/${id}/status`, payload);
import api from "./axios";

export const getApplicationsApi = (params) => api.get("/applications", { params });
export const createApplicationApi = (payload) => api.post("/applications", payload);
export const updateApplicationStatusApi = (id, payload) =>
  api.patch(`/applications/${id}/status`, payload);
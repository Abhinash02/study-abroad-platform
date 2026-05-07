import axios from "axios";

const API_BASE = "http://localhost:4000/api";

export const createApplicationApi = (data) =>
  axios.post(`${API_BASE}/applications`, data);

export const applyProgramApi = (data) =>
  axios.post(`${API_BASE}/applications/apply`, data);

export const getApplicationsApi = () =>
  axios.get(`${API_BASE}/applications`);

export const getApplicationByIdApi = (id) =>
  axios.get(`${API_BASE}/applications/${id}`);

export const updateApplicationApi = (id, data) =>
  axios.put(`${API_BASE}/applications/${id}`, data);

export const deleteApplicationApi = (id) =>
  axios.delete(`${API_BASE}/applications/${id}`);
// import api from "./axios";

// export const loginApi = (payload) => api.post("/auth/login", payload);
// export const registerApi = (payload) => api.post("/auth/register", payload);
// export const meApi = () => api.get("/auth/me");
// import api from "./axios";

// export const registerApi = (payload) => api.post("/auth/register", payload);
// export const loginApi = (payload) => api.post("/auth/login", payload);
// export const meApi = () => api.get("/auth/me");


import api from "./axios";

export const loginApi = (payload) => api.post("/auth/login", payload);
export const registerApi = (payload) => api.post("/auth/register", payload);
export const meApi = () => api.get("/auth/me");
export const updateMeApi = (payload) => api.patch("/auth/me", payload);
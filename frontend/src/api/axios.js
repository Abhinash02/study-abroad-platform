// import axios from "axios";

// // const api = axios.create({
// //   baseURL: "http://localhost:4000/api",
// // });
// const api = axios.create({
//   baseURL: "http://localhost:4000/api",
// });


// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("waygood_token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;


// import axios from "axios";


// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:4000/api",
// });

// api.interceptors.request.use((config) => {
//   return config;
// });

// export default api;


import axios from "axios";
import { getToken } from "../utils/storage";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
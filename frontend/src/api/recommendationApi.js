// import api from "./axios";

// export const getRecommendationsApi = (studentId) =>
//   api.get(`/recommendations/${studentId}`);
import api from "./axios";

export const getRecommendationsApi = (studentId) =>
  api.get(`/recommendations/${studentId}`);
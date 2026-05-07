import api from "./axios";

export const compareProgramsApi = ({ studentId, programIds }) =>
  api.get("/programs/compare", {
    params: {
      studentId,
      programIds: programIds.join(","),
    },
  });
import api from "../utils/api";

export const getTasks = async (param) => {
  return await api.get("/api/task/tasks", {
    params: param,
    withCredentials: true,
  });
};

export const createTask = async (payload) => {
  return await api.post("/api/task/create-task", payload);
};

export const deleteTask = async (id) => {
  return await api.post(`/api/task/delete-task/${id}`);
};

export const updateTask = async (payload, id) => {
  return await api.post(`/api/task/update-task/${id}`, payload);
};

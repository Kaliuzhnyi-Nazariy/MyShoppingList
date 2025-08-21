import type { ListItem } from "../types";
import api from "./axios.util";

export const getAll = async () => {
  const res = await api.get("/list");
  return res.data;
};

export const getOne = async (id: number) => {
  const res = await api.get(`/list/${id}`);
  return res.data;
};

export const postItem = async (data: ListItem) => {
  const res = await api.post("/list", data);
  return res.data;
};

export const updateItem = async ({
  id,
  data,
}: {
  id: number;
  data: ListItem;
}) => {
  const res = await api.put(`/list/${id}`, data);
  return res.data;
};

export const deleteItem = async (id: number) => {
  const res = await api.delete(`/list/${id}`);
  return res.data;
};

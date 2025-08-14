import axios from "axios";
import type { ListItem } from "../types";

axios.defaults.baseURL = "http://localhost:3002/api";

export const getAll = async () => {
  const res = await axios.get("/list");
  return res.data;
};

export const getOne = async (id: number) => {
  const res = await axios.get(`/list/${id}`);
  return res.data;
};

export const postItem = async (data: ListItem) => {
  const res = await axios.post("/list", data);
  return res.data;
};

export const updateItem = async ({
  id,
  data,
}: {
  id: number;
  data: ListItem;
}) => {
  const res = await axios.put(`/list/${id}`, data);
  return res.data;
};

export const deleteItem = async (id: number) => {
  const res = await axios.delete(`/list/${id}`);
  return res.data;
};

import api from "./axios.util";
import type { AddUser } from "../types";

const setHeader = (token: string) => {
  localStorage.setItem("token", token);
  api.defaults.headers.authorization = `Bearer ${token}`;
};

const cleanHeader = () => {
  localStorage.removeItem("token");
  api.defaults.headers.authorization = ``;
};

export const getUser = async () => {
  const res = await api.get("/users");
  console.log(res);
  return res.data;
};

export const addUser = async (data: AddUser) => {
  const res = await api.post("/users/signup", data);
  setHeader(res.data.token);
  return res.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await api.post("/users/signin", data);
  setHeader(res.data.token);
  return res.data;
};

export const deleteUser = async (data: { id: number }) => {
  const res = await api.delete("/users", { data });
  cleanHeader();
  return res.data;
};

export const logout = async () => {
  const res = await api.post("/users/logout");
  cleanHeader();
  return res.data;
};

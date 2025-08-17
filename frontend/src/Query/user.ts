import axios from "axios";
import type { AddUser } from "../types";

const setHeader = (token: string) => {
  axios.defaults.headers.authoriztion = `Bearer ${token}`;
};

const cleanHeader = () => {
  axios.defaults.headers.authoriztion = ``;
};

export const getUser = async () => {
  const res = await axios.get("/users");
  return res.data.data;
};

export const addUser = async (data: AddUser) => {
  const res = await axios.post("/users/signup", data);
  setHeader(res.data.token);
  return res.data.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await axios.post("/users/signin", data);
  setHeader(res.data.token);
  return res.data.data;
};

export const deleteUser = async (data: { id: number }) => {
  const res = await axios.delete("/users", { data });
  cleanHeader();
  return res.data.data;
};

export const logout = async () => {
  const res = await axios.post("/users/logout");
  cleanHeader();
  return res.data.data;
};

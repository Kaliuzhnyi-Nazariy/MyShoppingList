import { Request, Response } from "express";
import { AddUser, IUser, RequestUser } from "../types";
import ctrlWrapper from "../helper";
const pool = require("../lib/db.ts");
import jwt = require("jsonwebtoken");
import bcrypt = require("bcryptjs");

const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const { SECRET_JWT } = process.env;

type Answer = { data: IUser; token?: string } | { message: string };

const getUser = async (
  req: Request<{}, {}, { id: number }>,
  res: Response<Answer>
) => {
  const { id } = (req as unknown as RequestUser).user;

  const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

  if (user.rows.length == 0) {
    res.status(404).json({ message: "User not found!" });
  }

  const result = user.rows[0];
  delete result.password;

  res.status(200).json(result);
};

const addUser = async (
  req: Request<{}, {}, AddUser>,
  res: Response<{ data: Partial<IUser>; token?: string } | { message: string }>
) => {
  const { name, email, password, confirmPassword } = req.body;

  const isUser = await pool.query(`SELECT * FROM users WHERE email ILIKE  $1`, [
    email,
  ]);

  if (isUser.rows.length > 0) {
    res.status(409).json({ message: "This email already in use!" });
  }

  if (password !== confirmPassword) {
    res.status(400).json({ message: "Bad passwords!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const data = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, hashedPassword]
  );

  const result = data.rows[0];

  const payload = {
    id: result.id,
  };

  const token = jwt.sign(payload, SECRET_JWT as string, { expiresIn: "256h" });

  const dataWithToken = await pool.query(
    "UPDATE users SET token=$1 WHERE id=$2 RETURNING *",
    [token, result.id]
  );

  delete dataWithToken.password;

  res.status(201).json({ data: dataWithToken.rows[0], token });
};

const loginUser = async (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response<Answer>
) => {
  const { email, password } = req.body;

  const user = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (user.rows.length == 0) {
    res.status(400).json({ message: "Email or password is wrong!" });
  }

  if (password != user.rows[0].password) {
    res.status(400).json({ message: "Email or password is wrong!" });
  }

  const result = user.rows[0];

  const payload = {
    id: result.id,
  };

  const token = jwt.sign(payload, SECRET_JWT as string, {
    expiresIn: "256h",
  });

  delete result.password;

  res.status(200).json({ data: result, token });
};

const deleteUser = async (req: Request, res: Response<Answer>) => {
  const { id } = (req as unknown as RequestUser).user;
  const user = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [
    id,
  ]);

  if (user.rows.length == 0) {
    res.status(404).json({ message: "User not found" });
  }
  const result = user.rows[0];
  delete result.password;

  res.status(200).json(result);
};

const logout = async (req: Request, res: Response) => {
  const { id } = (req as unknown as RequestUser).user;

  const data = await pool.query(`UPDATE users SET token='' WHERE id=${id}`);

  if (data.rows.length == 0)
    res.status(500).json({ message: "Something went wrong!" });

  const result = data.rows[0];
  delete result.password;

  res.status(200).json({ data: result });
};

export default {
  addUser: ctrlWrapper(addUser),
  getUser: ctrlWrapper(getUser),
  loginUser: ctrlWrapper(loginUser),
  deleteUser: ctrlWrapper(deleteUser),
  logout: ctrlWrapper(logout),
};

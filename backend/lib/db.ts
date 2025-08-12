import { Pool } from "pg";
const dotenv = require("dotenv");

dotenv.config();

const { DB_HOST, DB_PORT, DB_PASSWORD, DB_USER, DB_DATABASE } = process.env;

const pool = new Pool({
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

module.exports = pool;

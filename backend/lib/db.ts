import { Pool } from "pg";
const dotenv = require("dotenv");

dotenv.config();

const { PG_INTERNAL, DB_USER_GIVEN } = process.env;

const pool = new Pool({
  // connectionString: PG_INTERNAL,
  // ssl: { rejectUnauthorized: false },
  // user: DB_USER_GIVEN,
  // host: process.env.PG_HOST,
  // user: process.env.PG_USER,
  // password: process.env.PG_PASSWORD,
  // database: process.env.PG_DATABASE,
  // port: Number(process.env.DB_PORT),

  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),

  // connectionString: process.env.PG_EXTERNAL,
  // ssl: { rejectUnauthorized: false },
});

module.exports = pool;

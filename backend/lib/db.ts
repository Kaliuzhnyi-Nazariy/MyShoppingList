import { Pool } from "pg";
const dotenv = require("dotenv");

dotenv.config();

const { PG_INTERNAL, DB_USER_GIVEN } = process.env;

const pool = new Pool({
  connectionString: PG_INTERNAL,
  ssl: { rejectUnauthorized: false },
  user: DB_USER_GIVEN,
});

module.exports = pool;

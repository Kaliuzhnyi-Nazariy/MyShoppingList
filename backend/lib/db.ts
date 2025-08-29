import { Pool } from "pg";
const dotenv = require("dotenv");

dotenv.config();

const { DB_CONNECTION_LINK, DB_USER_GIVEN } = process.env;

const pool = new Pool({
  connectionString: DB_CONNECTION_LINK,
  ssl: { rejectUnauthorized: false },
  user: DB_USER_GIVEN,
});

module.exports = pool;

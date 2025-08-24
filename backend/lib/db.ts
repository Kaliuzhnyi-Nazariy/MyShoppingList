import { Pool } from "pg";
const dotenv = require("dotenv");

dotenv.config();

const { DB_CONNECTION_LINK } = process.env;

const pool = new Pool({
  connectionString: DB_CONNECTION_LINK,
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;

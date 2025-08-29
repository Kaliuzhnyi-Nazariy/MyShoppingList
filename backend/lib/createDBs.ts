const pool = require("./db");

const createDBs = async () => {
  const res = await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(64) NOT NULL,
      email VARCHAR(128) NOT NULL UNIQUE,
      password VARCHAR(64) NOT NULL,
      token VARCHAR(156)
    );

    CREATE TABLE IF NOT EXISTS shopping_list (
      id SERIAL PRIMARY KEY,
      good VARCHAR(128) NOT NULL,
      description VARCHAR(256),
      store VARCHAR(64) NOT NULL,
      owner_id INT NOT NULL,
      FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);
};

module.exports = createDBs;

import express = require("express");
import cors = require("cors");
import dotenv = require("dotenv");
const pool = require("./lib/db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const data = await pool.query("SELECT * FROM test");
    res.status(200).json({ data: data.rows });
  } catch (error) {
    res.status(500).json({ message: "sth went wrong", error: error });
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});

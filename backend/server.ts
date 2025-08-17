import express = require("express");
import cors = require("cors");
import dotenv = require("dotenv");
import listRoute from "./routes/list";
import usersRoute from "./routes/users";
import errorRoute from "./routes/error";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api", listRoute);
app.use("/api", usersRoute);
app.use(errorRoute);

app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});

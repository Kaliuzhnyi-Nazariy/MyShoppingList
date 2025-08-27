import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import listRoute from "./routes/list";
import usersRoute from "./routes/users";
import errorRoute from "./routes/error";
import helmet from "helmet";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use(helmet({ contentSecurityPolicy: false }));

app.use("/api", listRoute);
app.use("/api", usersRoute);
app.use(errorRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
  });
}

app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});

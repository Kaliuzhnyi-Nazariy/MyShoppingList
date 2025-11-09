import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import listRoute from "./routes/list";
import usersRoute from "./routes/users";
import errorRoute from "./routes/error";
import helmet from "helmet";
import path from "path";
const createDBs = require("./lib/createDBs");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use(helmet({ contentSecurityPolicy: false }));

app.use("/api", listRoute);
app.use("/api", usersRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.all("/{*any}", (_req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
  });
}

app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});
app.use(errorRoute);

// createDBs()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log("server is running on port " + PORT);
//     });
//   })
//   .catch((err: unknown) => {
//     console.log(err);
//     process.exit(1);
//   });

createDBs()
  .then(() => {
    app.listen(PORT, () => {
      console.log("server is running on port " + PORT);
    });
  })
  .catch((err: unknown) => {
    console.log(err);
    process.exit(1);
  });

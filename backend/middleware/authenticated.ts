// import { NextFunction, Request, Response } from "express";
// import jwt = require("jsonwebtoken");
// import { RequestUser } from "../types";
// const pool = require("../lib/db.ts");

// const dotenv = require("dotenv");
// const path = require("path");

// dotenv.config({
//   path: path.resolve(__dirname, "../.env"),
// });

// const { SECRET_JWT } = process.env;

// const isAuthenticated = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { authorization = "" } = req.headers;
//   const [bearer, token] = authorization.split(" ");
//   console.log({ bearer, token });
//   if (bearer !== "Bearer")
//     return res.status(401).json({ message: "Unauthorized!" });

//   console.log({ token });

//   try {
//     const { id } = jwt.verify(token, SECRET_JWT as string) as jwt.JwtPayload & {
//       id: number;
//     };

//     console.log({ id });

//     const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

//     const userRes = user.rows[0];
//     console.log(userRes);

//     if (!userRes || !userRes.token || userRes.token !== token) {
//       next(new Error("Unauthorized!"));
//     }

//     (req as unknown as RequestUser).user = userRes;
//     next();
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.log(error.message);
//     } else {
//       console.log(error);
//     }
//   }
// };

// export default isAuthenticated;

import { NextFunction, Request, Response } from "express";
import jwt = require("jsonwebtoken");
import { RequestUser } from "../types";
const pool = require("../lib/db.ts");

const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const { SECRET_JWT } = process.env;

const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers["authorization"] || "";
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer")
    return res.status(401).json({ message: "Unauthorized!" });

  console.log({ token });

  try {
    const { id } = jwt.verify(token, SECRET_JWT as string) as jwt.JwtPayload & {
      id: number;
    };

    console.log({ id });

    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

    const userRes = user.rows[0];
    console.log(userRes);

    if (!userRes || !userRes.token || userRes.token !== token) {
      next(new Error("Unauthorized!"));
    }

    (req as unknown as RequestUser).user = userRes;
    next();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log(error);
    }
  }
};

export default isAuthenticated;

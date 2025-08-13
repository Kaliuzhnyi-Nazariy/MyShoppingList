import { NextFunction, Request, Response } from "express";

const errorRoute = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = (error as any).status || 500;
  const message = error.message || "Server error!";

  return res.status(status).json({ message });
};

export default errorRoute;

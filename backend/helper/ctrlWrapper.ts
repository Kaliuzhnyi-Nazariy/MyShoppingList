import { NextFunction, Request, Response } from "express";

type ctrlFunc<Params = any, ResBody = any, ReqBody = any> = (
  req: Request<Params, ResBody, ReqBody>,
  res: Response<ResBody>,
  next: NextFunction
) => Promise<any>;

const ctrlWrapper = <Params = any, ResBody = any, ReqBody = any>(
  ctrl: ctrlFunc<Params, ResBody, ReqBody>
) => {
  const fn = async (
    req: Request<Params, ResBody, ReqBody>,
    res: Response<ResBody>,
    next: NextFunction
  ) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return fn;
};

// export default ctrlWrapper;

module.exports = ctrlWrapper;

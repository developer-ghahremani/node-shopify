import { NextFunction, Request, Response } from "express";

export const mainMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log("I passed from main middleware", req.url);
  next();
};

import { Request, Response } from "express";

export const errorMiddleware = (req: Request, res: Response) => {
  //   console.log(err, "BE ERROR RESIDA");

  //   if (err.status) return res.status(err.status).json({ message: err.message });
  res.status(404).json({ message: "NOT FOUND" });
};

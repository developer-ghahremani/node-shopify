import { Router } from "express";
import clientAuthRoute from "./auth.route";

const clientRouter = Router();

clientRouter.use("/auth", clientAuthRoute);

export default clientRouter;

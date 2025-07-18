import { Router } from "express";
import clientRouter from "./client/routes";
import adminRouter from "./admin/routes";
import { errorMiddleware } from "../middleware/error.middleware";

const routes = Router();

routes.use("/client", clientRouter);
routes.use("/admin", adminRouter);

routes.use((req, res) => {
  res.status(400).json({ message: "Not found page" });
});

export default routes;

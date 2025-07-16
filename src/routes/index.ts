import { Router } from "express";
import clientRouter from "./client/routes";
import adminRouter from "./admin/routes";

const routes = Router();

routes.use("/client", clientRouter);
routes.use("/admin", adminRouter);

routes.use("", (req, res) => {
  res.status(404).send({ message: "404 occurred" });
});

export default routes;

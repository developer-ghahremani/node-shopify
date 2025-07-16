import { Router } from "express";
import z from "zod";
import { validateInputData } from "../../middleware/validation.middleware";

const clientAuthRoute = Router();

clientAuthRoute.post(
  "/sign-up",
  validateInputData(
    z.object({ email: z.email(), password: z.string(), passwordVerification: z.string() })
  ),
  (req, res) => {
    try {
      const { email, password, passwordVerification } = req.body;
      if (password !== passwordVerification)
        return res.status(401).send({ message: "Password should be same" });
      res.status(200).send({ message: "Sign up  successfully" });
    } catch (error) {
      res.send(error);
    }
  }
);

export default clientAuthRoute;

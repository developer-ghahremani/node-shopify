import { Router } from "express";
import z from "zod";
import { userDataSource } from "../../../database/src/data-source";
import { validateInputData } from "../../middleware/validation.middleware";
import bcrypt from "bcrypt";

const clientAuthRoute = Router();

clientAuthRoute.post(
  "/sign-up",
  validateInputData(
    z.object({ email: z.email(), password: z.string(), passwordVerification: z.string() })
  ),
  async (req, res) => {
    try {
      const { email, password, passwordVerification } = req.body;
      if (password !== passwordVerification)
        return res.status(401).send({ message: "Password should be same" });

      const isEmailExist = await userDataSource.findOneBy({ email });
      console.log(isEmailExist);

      if (isEmailExist) return res.status(401).send({ message: "Email is already exist!!!" });
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await userDataSource.save({ email, password: hashedPassword });

      res.status(200).send({ message: "Sign up  successfully", user: { email: user.email } });
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

export default clientAuthRoute;

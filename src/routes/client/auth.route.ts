import bcrypt from "bcrypt";
import { NextFunction, Request, Response, Router } from "express";
import { sign as jwtSign, verify as jwtVerify } from "jsonwebtoken";
import moment from "moment";
import z from "zod";
import { userDataSource } from "../../../database/src/data-source";
import { validateInputData } from "../../middleware/validation.middleware";
import { transporter } from "../../utils/email.util";

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

clientAuthRoute.post(
  "/sign-in",
  validateInputData(z.object({ email: z.email(), password: z.string() })),
  async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await userDataSource.findOneBy({ email });
      if (!user) return res.status(401).send({ message: "Error while login" });

      const isPasswordVerified = await bcrypt.compare(password, user.password);
      if (!isPasswordVerified) return res.status(401).send({ message: "Error while login" });

      const jwtToken = jwtSign(
        { user: { id: user.id, expiredAt: moment().add(6, "months").unix() } },
        process.env.PRIVATE_KEY || ""
      );
      res.status(200).send({ user: { id: user.id, firstName: user.firstName }, token: jwtToken });
    } catch (error) {
      res.status(401).send(error);
    }
  }
);

clientAuthRoute.post(
  "/forget-password/send-email",
  validateInputData(z.object({ email: z.email() })),
  async (req, res) => {
    const { email } = req.body;
    const code = Math.floor(Math.random() * 100000);
    if (email === process.env.COMPANY_EMAIL)
      return res.status(400).send({ message: "Faazet chie" });
    const user = await userDataSource.findOneBy({ email });
    if (!user) return res.status(400).send({ message: "User does not exist." });

    user.passwordCodeVerification = code;
    await userDataSource.save(user);

    try {
      const mailOptions = {
        from: process.env.COMPANY_EMAIL,
        to: email,
        subject: "Your Login Link",
        html: `<p>Click <p>here Is the Code ${code}</p> to login. This link expires in 15 minutes.</p>`,
      };
      await transporter.sendMail(mailOptions);
      res.status(200).send("Authentication email sent.");
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

clientAuthRoute.post(
  "/forget-password/change-password",
  validateInputData(z.object({ email: z.email(), code: z.number(), password: z.string() })),
  async (req, res) => {
    const { email, code, password } = req.body;
    try {
      const user = await userDataSource.findOneBy({ email, passwordCodeVerification: code });
      if (!user) return res.status(400).send({ message: "User not exist" });

      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      user.passwordCodeVerification = 0;

      await userDataSource.save(user);
      res.status(400).send({ message: "Updated" });
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

clientAuthRoute.post(
  "/edit-profile",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      if (!authorization) throw new Error("Token not sent");
      const user = jwtVerify(authorization, process.env.PRIVATE_KEY || "") as {
        user: { id: number };
      };
      console.log(user);
      // req.user = user.user;

      next();
    } catch (error) {
      res.status(400).send({ error });
    }
  },
  (req, res, next) => {
    res.send({ message: "Everything is Ok sweat heart." });
  }
);

export default clientAuthRoute;

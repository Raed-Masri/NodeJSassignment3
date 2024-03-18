import express, { Router, Response } from "express";
import bcrypt from "bcrypt";
import speakeasy from "speakeasy";

import { IUser, IUserLogin } from "../types/user.types";
import UserModel from "../models/user.model";
import OtpModel from "../models/otp.model";
import sendEmail from "../utils/sendEmail";

const router: Router = express.Router();

router.post("/sign-up", async (req: { body: IUser }, res: Response) => {
  const { email, password } = req.body;

  try {
    const isExist = await UserModel.findOne({ email: email }); //email in the database equal to the received email

    if (isExist) {
      res.status(409).send("User already exists");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await UserModel.create({ ...req.body, password: hashedPassword });

      res.status(200).send("Sign up Successfull");
    }
  } catch (error) {
    return error;
  }
});

router.post("/sign-in", async (req: { body: IUserLogin }, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (isPasswordMatch) {
        res.status(200).send("Login Successfull");
      } else {
        res.status(401).send("Password Incorrect");
      }
    } else {
      res.status(404).send("User Not Found");
    }
  } catch (error) {
    return error;
  }
});

router.post("/reset-password",async (req: { body: IUserLogin }, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await UserModel.findOne({ email });

      if (user) {
        const hashedPassword = await bcrypt.hash(password, 10);

        await UserModel.updateOne({ email }, { password: hashedPassword });

        res.status(200).send("password reset successfully");
      } else {
        res.status(404).send("user not found");
      }
    } catch (error) {
      return error;
    }
  }
);

router.post("/send-otp/:email",async (req: { params: { email: string } }, res: Response) => {
    const { email } = req.params;

    try {
      const secret = speakeasy.generateSecret({ length: 20 });
      const otp = speakeasy.totp({
        secret: secret.base32,
        encoding: "base32",
      });
      const expiry = new Date(Date.now() + 10 * 60 * 1000); // should be expired after 10 mins

      await OtpModel.create({ otp, expiry }); //save otp in database

      await sendEmail({
        from: "Raed",
        to: email,
        subject: "OTP",
        text: `Your OTP is ${otp}`,
      });

      res.status(200).send("OTP sent");
    } catch (error) {
      return error;
    }
  }
);

router.post("/verify-otp/:otp",async (req: { params: { otp: string } }, res: Response) => {
    const { otp } = req.params;

    try {
      const isOtpExist = await OtpModel.findOne({ otp: otp });

      if (isOtpExist) {
        if (new Date() < isOtpExist.expiry) {
          res.status(200).send("valid OTP");
        } else {
          res.status(404).send("expired OTP");
        }
      } else {
        res.status(404).send("invalid OTP");
      }
    } catch (error) {
      return error;
    }
  }
);

export default router;

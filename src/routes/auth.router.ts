import express from "express";
import AuthController from "../controllers/auth.controller";
import { Validator } from "../middleware"
import {
  signUp,
  signIn,
} from "../schema/auth.schema"

const router = express.Router();

router.post("/signup", Validator(signUp, "body"), async (req, res) => {
  const controller = new AuthController();
  const response = await controller.signUpUser(req.body);
  return res.status(201).send(response);
});

router.post("/signin", Validator(signIn, "body"), async (req, res) => {
  const controller = new AuthController();
  const response = await controller.signInUser(req.body);
  if (!response) return res.status(404).send({ message: "No user found" });
  if (response.message) return res.status(401).send(response);
  return res.status(200).send(response);
});

export default router;
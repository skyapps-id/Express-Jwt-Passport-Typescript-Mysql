import express from "express";
import passport from "passport";
import PingController from "../controllers/ping";
import AuthController from "./auth.router";
import UserRouter  from "./user.router";
import PostRouter  from "./post.router";
import CommentRouter  from "./comment.router";
import { Passport } from "../middleware";

const router = express.Router();

Passport(passport);

router.get("/ping", async (_req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});

router.use("/auth", AuthController);
router.use("/users", passport.authenticate('jwt', {session:false}), UserRouter);
router.use("/posts", passport.authenticate('jwt', {session:false}), PostRouter);
router.use("/comments", passport.authenticate('jwt', {session:false}), CommentRouter);

export default router;
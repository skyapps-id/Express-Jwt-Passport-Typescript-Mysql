import express from "express";
import CommentController from "../controllers/comment.controller";
import { Validator } from "../middleware"
import {
  create,
  getAll,
  getOne,
  update,
  destroy,
} from "../schema/comment.schema"

const router = express.Router();

router.get("/", Validator(getAll, "query"), async (_req, res) => {
  const controller = new CommentController();
  const response = await controller.getComments();
  return res.status(201).send(response);
});

router.post("/", Validator(create, "body"), async (req, res) => {
  const controller = new CommentController();
  const response = await controller.createComment(req.body);
  if (response.message) return res.status(502).send({ message: response.message });
  return res.status(200).send(response);
});

router.get("/:id", Validator(getOne, "params"), async (req, res) => {
  const controller = new CommentController();
  const response = await controller.getComment(req.params.id);
  if (!response) return res.status(404).send({ message: "No comment found" });
  return res.status(200).send(response);
});

router.put("/:id", Validator(update, "body"), async (req, res) => {
  const controller = new CommentController();
  const response = await controller.updateComment(req.params.id, req.body);
  if (!response) return res.status(404).send({ message: "No comment found" });
  return res.status(200).send({ message: "Updated" });
});

router.delete("/:id", Validator(destroy, "params"), async (req, res) => {
  const controller = new CommentController();
  const response = await controller.deleteComment(req.params.id);
  if (!response) return res.status(404).send({ message: "No comment found" });
  return res.status(200).send({ message: "Deleted" });
});

export default router;
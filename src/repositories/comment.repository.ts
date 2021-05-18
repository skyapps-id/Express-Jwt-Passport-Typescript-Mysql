import { getRepository } from "typeorm";
import { Comment } from "../models";

export interface ICommentPayload {
  content: string;
  userId: number;
  commentId: number;
}

export const getComments = async (): Promise<Array<Comment>> => {
  const commentRepository = getRepository(Comment);
  return commentRepository.find();
};

export const createComment = async (payload: ICommentPayload): Promise<Comment> => {
  const commentRepository = getRepository(Comment);
  const comment = new Comment();
  try {
    return await commentRepository.save({
      ...comment,
      ...payload,
    });
  } catch (e) {
    console.log(e.message);
    comment.message = e.message;
    return comment;
  }
};

export const getComment = async (id: number): Promise<Comment | null> => {
  const commentRepository = getRepository(Comment);
  const comment = await commentRepository.findOne({ id: id });
  if (!comment) return null;
  return comment;
};

export const updateComment = async (id: number, payload: ICommentPayload): Promise<Comment | null> => {
  const commentRepository = getRepository(Comment);
  const comment = await commentRepository.findOne({ id: id });
  if (!comment) return null;
  comment.content = payload.content;
  await commentRepository.update(
    { id: id },
    comment,
  )
  if (!comment) return null;
  return comment;
};

export const deleteComment = async (id: number): Promise<Comment | null> => {
  const commentRepository = getRepository(Comment);
  const comment = await commentRepository.findOne({ id: id });
  if (!comment) return null;
  await commentRepository.delete({ id: id });
  return comment;
};
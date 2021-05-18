import { Get, Route, Tags, Post, Put, Delete, Body, Path, Security } from "tsoa";
import { Comment } from "../models";
import {
  getComments,
  ICommentPayload,
  createComment,
  getComment,
  updateComment,
  deleteComment,
} from "../repositories/comment.repository";

@Route("/api/v1/comments")
@Tags("Comment")
export default class CommentController {
  @Security('jwt')
  @Get()
  public async getComments(): Promise<Array<Comment>> {
    return getComments();
  }

  @Security('jwt')
  @Post("/")
  public async createComment(@Body() body: ICommentPayload): Promise<Comment> {
    return createComment(body);
  }

  @Security('jwt')
  @Get("/:id")
  public async getComment(@Path() id: string): Promise<Comment | null> {
    return getComment(Number(id));
  }

  @Security('jwt')
  @Put("/:id")
  public async updateComment(@Path() id: string, @Body() body: ICommentPayload): Promise<Comment | null> {
    return updateComment(Number(id), body);
  }

  @Security('jwt')
  @Delete("/:id")
  public async deleteComment(@Path() id: string): Promise<Comment | null> {
    return deleteComment(Number(id));
  }
}
import { Get, Route, Tags, Post as PostMethod, Put, Delete, Body, Path, Security } from "tsoa";
import { Post } from "../models";
import {
  createPost,
  getPosts,
  IPostPayload,
  getPost,
  updatePost,
  deletePost,
} from "../repositories/post.repository";

@Route("/api/v1/posts")
@Tags("Post")
export default class PostController {
  @Security('jwt')
  @Get("")
  public async getPosts(): Promise<Array<Post>> {
    return getPosts();
  }

  @Security('jwt')
  @PostMethod("/")
  public async createPost(@Body() body: IPostPayload): Promise<Post> {
    return createPost(body);
  }

  @Security('jwt')
  @Get("/:id")
  public async getPost(@Path() id: string): Promise<Post | null> {
    return getPost(Number(id));
  }

  @Security('jwt')
  @Put("/:id")
  public async updatePost(@Path() id: string, @Body() body: IPostPayload): Promise<Post | null> {
    return updatePost(Number(id), body);
  }

  @Security('jwt')
  @Delete("/:id")
  public async deletePost(@Path() id: string): Promise<Post | null> {
    return deletePost(Number(id));
  }
}
import { getRepository } from "typeorm";
import { Post } from "../models";

export interface IPostPayload {
  title: string;
  content: string;
  userId: number;
}

export const getPosts = async (): Promise<Array<Post>> => {
  const postRepository = getRepository(Post);
  return postRepository.find();
};

export const createPost = async (payload: IPostPayload): Promise<Post> => {
  const postRepository = getRepository(Post);
  const post = new Post();
  try {
    return await postRepository.save({
      ...post,
      ...payload,
    });
  } catch (e) {
    console.log(e.message);
    post.message = e.message;
    return post;
  }
};

export const getPost = async (id: number): Promise<Post | null> => {
  const postRepository = getRepository(Post);
  const post = await postRepository.findOne({ id: id });
  if (!post) return null;
  return post;
};

export const updatePost = async (id: number, payload: IPostPayload): Promise<Post | null> => {
  const postRepository = getRepository(Post);
  const post = await postRepository.findOne({ id: id });
  if (!post) return null;
  post.title = payload.title;
  post.content = payload.content;
  await postRepository.update(
    { id: id },
    post,
  )
  if (!post) return null;
  return post;
};

export const deletePost = async (id: number): Promise<Post | null> => {
  const postRepository = getRepository(Post);
  const post = await postRepository.findOne({ id: id });
  if (!post) return null;
  await postRepository.delete({ id: id });
  return post;
};
import { Get, Route, Tags, Post, Put, Delete, Body, Path, Security, Header } from "tsoa";
import { User } from "../models";
import {
  getUsers,
  createUser,
  IUserPayload,
  getUser,
  updateUser,
  deleteUser,
} from "../repositories/user.repository";

@Route("/api/v1/users")
@Tags("User")
export default class UserController {
  @Security('jwt')
  @Get()
  public async getUsers(): Promise<Array<User>> {
    return getUsers();
  }

  @Security('jwt')
  @Post("/")
  public async createUser(@Body() body: IUserPayload): Promise<User> {
    return createUser(body);
  }
  
  @Security('jwt')
  @Get("/:id")
  public async getUser(@Path() id: string): Promise<User | null> {
    return getUser(Number(id));
  }

  @Security('jwt')
  @Put("/:id")
  public async updateUser(@Path() id: string, @Body() body: IUserPayload): Promise<User | null> {
    return updateUser(Number(id), body);
  }

  @Security('jwt')
  @Delete("/:id")
  public async deleteUser(@Path() id: string): Promise<User | null> {
    return deleteUser(Number(id));
  }
}
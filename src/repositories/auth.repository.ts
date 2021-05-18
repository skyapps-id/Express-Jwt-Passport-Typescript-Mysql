import { getRepository } from "typeorm";
import { User } from "../models";

export interface IAuthPayload {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
}

export interface OAuthPayload {
  email?: String;
  token?: String;
  message?: String;
}

export const signUpUser = async (payload: IAuthPayload): Promise<User> => {
  const userRepository = getRepository(User);
  const user = new User();
  
  return userRepository.save({
    ...user,
    ...payload,
  });
};

export const signInUser = async (payload: IAuthPayload): Promise<User | null> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ email: payload.email });
  if (!user) return null;
  return user;
};

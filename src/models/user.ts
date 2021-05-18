import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Post } from "./post";
import { Comment } from "./comment";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: String;

  @Column()
  lastName!: String;

  @Column()
  email!: String;

  @Column()
  password!: String;

  @OneToMany((_type) => Post, (post: Post) => post.user)
  posts!: Array<Post>;

  @OneToMany((_type) => Comment, (comment: Comment) => comment.user)
  comments!: Array<Comment>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
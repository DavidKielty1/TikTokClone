import { Post } from '@prisma/client';
import { PostType } from 'src/post/post.type';
import { User } from 'src/user/user.model';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Comment {
  @Field(() => Int)
  id: number;

  @Field(() => User)
  user: User;

  @Field(() => PostType)
  post: Post;

  @Field()
  text: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

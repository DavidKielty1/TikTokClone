import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCommentDto {
  @Field()
  text: string;

  @Field(() => Int)
  postId: number;

  @Field(() => Int)
  userId: number;
}

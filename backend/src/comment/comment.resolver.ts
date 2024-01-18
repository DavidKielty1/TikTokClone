import { Request } from 'express';
import { Query, Resolver, Context, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Comment } from './comment.type';
import { GraphqlAuthGuard } from 'src/auth/graphlql-auth.guard';
import { CommentService } from './comment.service';

@Resolver()
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query(() => [Comment])
  async getCommentsByPostId(@Args('postId') postId: number) {
    return this.commentService.getCommentsByPostId(postId);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Comment)
  createComment(
    @Args('postId') postId: number,
    @Args('text') text: string,
    @Context() ctx: { req: Request },
  ) {
    return this.commentService.createComment({
      text: text,
      userId: ctx.req.user.sub,
      postId,
    });
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation(() => Comment)
  deleteComment(@Args('id') id: number, @Context() ctx: { req: Request }) {
    return this.commentService.deleteComment(id, ctx.req.user.sub);
  }
}

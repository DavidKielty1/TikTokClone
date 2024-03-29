import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeResolver } from './like.resolver';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    LikeService,
    LikeResolver,
    PrismaService,
    JwtService,
    ConfigService,
  ],
})
export class LikeModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { StreaksModule } from './streaks/streaks.module';
import { LessonsModule } from './lessons/lessons.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 60000, limit: 30 }],
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    StreaksModule,
    LessonsModule,
  ],
})
export class AppModule {}

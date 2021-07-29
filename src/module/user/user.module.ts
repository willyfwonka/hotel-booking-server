import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AppQueueModule } from 'src/module/misc/app-queue/app-queue.module';
import { AuthModule } from 'src/module/auth/auth.module';

@Module({
  imports: [AppQueueModule, AuthModule],
  controllers: [UserController],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AppQueueModule } from 'src/module/misc/app-queue/app-queue.module';

@Module({
  imports: [AppQueueModule],
  controllers: [UserController],
})
export class UserModule {}

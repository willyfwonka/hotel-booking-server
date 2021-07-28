import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { AuthModule } from 'src/module/auth/auth.module';
import { AppQueueModule } from 'src/module/misc/app-queue/app-queue.module';

@Module({
  imports: [AuthModule, AppQueueModule],
  controllers: [ReservationController],
})
export class ReservationModule {}

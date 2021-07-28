import { Process, Processor } from '@nestjs/bull';
import { QueueType } from 'src/module/misc/app-queue/type/queue-type.enum';
import { Job } from 'bull';
import { JobType } from 'src/module/misc/app-queue/type/job-type.num';
import { plainToClass } from 'class-transformer';
import { CreateReservation } from 'src/module/reservation/input/create-reservation';
import { Reservation } from 'src/module/reservation/model/reservation';

@Processor(QueueType.RESERVATION)
export class ReservationConsumer {
  @Process(JobType.RESERVATION)
  async handleRegisterJob(job: Job<CreateReservation>) {
    return plainToClass(Reservation, job.data).save();
  }
}

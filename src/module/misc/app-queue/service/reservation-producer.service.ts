import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { QueueType } from 'src/module/misc/app-queue/type/queue-type.enum';
import { JobType } from 'src/module/misc/app-queue/type/job-type.num';
import { CreateReservation } from 'src/module/reservation/input/create-reservation';

@Injectable()
export class ReservationProducerService {
  constructor(@InjectQueue(QueueType.RESERVATION) private queue: Queue) {}

  async addToReservationQueue(
    data: CreateReservation,
  ): Promise<{ success: boolean }> {
    const queue = await this.queue.add(JobType.RESERVATION, data, {
      backoff: 1000,
    });

    return queue // Catching the error right after job is completed.
      .finished()
      .then(() => {
        return { success: true };
      })
      .catch((err) => {
        throw new BadRequestException(err.message);
      });
  }
}

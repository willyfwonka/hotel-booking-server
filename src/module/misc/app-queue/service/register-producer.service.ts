import { ConflictException, Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { QueueType } from 'src/module/misc/app-queue/type/queue-type.enum';
import { JobType } from 'src/module/misc/app-queue/type/job-type.num';
import { CreateUser } from 'src/module/user/input/create-user';

@Injectable()
export class RegisterProducerService {
  constructor(@InjectQueue(QueueType.REGISTER) private queue: Queue) {}

  async addToRegisterQueue(data: CreateUser): Promise<{ success: boolean }> {
    const queue = await this.queue.add(JobType.REGISTER, data, {
      backoff: 1000,
    });

    return queue // Catching the error right after job is completed.
      .finished()
      .then(() => {
        return { success: true };
      })
      .catch((err) => {
        if (err.message === 'Conflict') {
          throw new ConflictException();
        }
        throw err;
      });
  }
}

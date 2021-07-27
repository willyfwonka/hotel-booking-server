import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QueueOptions } from 'bull';
import { QueueType } from 'src/module/misc/app-queue/type/queue-type.enum';
import { RegisterConsumer } from 'src/module/misc/app-queue/consumer/register.consumer';
import { RegisterProducerService } from 'src/module/misc/app-queue/service/register-producer.service';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<QueueOptions> => ({
        redis: {
          host: configService.get('STORE_HOST'),
          port: configService.get('STORE_PORT'),
          db: configService.get('STORE_QUEUE_DB'),
        },
        defaultJobOptions: {
          timeout: 30000,
          attempts: 2,
          removeOnFail: true,
          removeOnComplete: true,
        },
      }),
    }),
    BullModule.registerQueue({
      name: QueueType.REGISTER,
    }),

    BullModule.registerQueue({
      name: QueueType.RESERVATION,
    }),
  ],
  providers: [RegisterConsumer, RegisterProducerService, RegisterConsumer],
  exports: [BullModule, RegisterProducerService],
})
export class AppQueueModule {}

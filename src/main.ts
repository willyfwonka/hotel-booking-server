import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(helmet());

  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });

  const configService: ConfigService = app.get(ConfigService);
  await app.listen(
    configService.get('SERVER_PORT'),
    configService.get('SERVER_HOST'),
  );
}

bootstrap();

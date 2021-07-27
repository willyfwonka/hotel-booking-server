import { Module } from '@nestjs/common';
import { AppTypeormModule } from 'src/module/misc/app-typeorm/app-typeorm.module';
import { AppConfigModule } from 'src/module/misc/app-config/app-config.module';
import { UserModule } from 'src/module/user/user.module';
import { AuthModule } from 'src/module/auth/auth.module';

@Module({
  imports: [AppTypeormModule, AppConfigModule, UserModule, AuthModule],
})
export class AppModule {}

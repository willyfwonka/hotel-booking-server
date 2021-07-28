import { Module } from '@nestjs/common';
import { AppTypeormModule } from 'src/module/misc/app-typeorm/app-typeorm.module';
import { AppConfigModule } from 'src/module/misc/app-config/app-config.module';
import { UserModule } from 'src/module/user/user.module';
import { ReservationModule } from 'src/module/reservation/reservation.module';
import { HotelModule } from 'src/module/hotel/hotel.module';
import { AppThrottleModule } from 'src/module/misc/app-throttle/app-throttle.module';

@Module({
  imports: [
    AppTypeormModule,
    AppConfigModule,
    AppThrottleModule,
    UserModule,
    ReservationModule,
    HotelModule,
  ],
})
export class AppModule {}

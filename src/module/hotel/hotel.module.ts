import { Module, OnModuleInit } from '@nestjs/common';
import { HotelController } from './hotel.controller';
import { Hotel } from 'src/module/hotel/model/hotel';
import * as seedData from 'res/hotels.json';
import { AuthModule } from 'src/module/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [HotelController],
})
export class HotelModule implements OnModuleInit {
  async onModuleInit() {
    const count = await Hotel.count();
    // Seeding
    if (count < 1) {
      await Hotel.create(seedData).forEach((hotel) => {
        hotel.save();
      });
    }
  }
}

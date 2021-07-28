import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { Hotel } from 'src/module/hotel/model/hotel';
import { Id } from 'src/module/shared/decorator/param/id';
import { UpdateHotel } from 'src/module/hotel/input/update-hotel';
import { ILike } from 'typeorm';
import { ListHotelInput } from 'src/module/hotel/input/list-hotel-input';
import { GetUserInterceptor } from 'src/module/interceptor/get-user-interceptor';
import { ListHotel } from 'src/module/hotel/model/list-hotel';

@Controller('hotel')
export class HotelController {
  @Get('list')
  @UseInterceptors(GetUserInterceptor)
  async getHotelList(
    @Req() req,
    @Query() { direction, query, pageSize, pageIndex }: ListHotelInput,
  ): Promise<ListHotel> {
    const [items, total] = await Hotel.findAndCount({
      order: { name: direction ?? 'ASC' },
      skip: pageIndex * pageSize,
      take: pageSize,
      where: [{ name: ILike('%' + query + '%') }],
      // Getting reservations if user is authenticated
      // Since only authenticated users may access hotel reservations
      relations: null != req.user ? ['reservations'] : [],
    });
    return {
      items,
      total,
    };
  }

  @Patch('id')
  async updateHotel(
    @Body() body: UpdateHotel,
    @Id() id: bigint,
  ): Promise<Hotel> {
    return Hotel.findOneAndUpdate({ id, ...body });
  }

  @Delete(':id')
  async deleteHotel(@Id() id: bigint): Promise<Hotel> {
    const hotel = await Hotel.findOneOrFail({ id });
    return hotel.softRemove();
  }
}

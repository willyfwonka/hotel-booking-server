import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { Reservation } from 'src/module/reservation/model/reservation';
import { ListReservationInput } from 'src/module/reservation/input/list-reservation-input';
import { GetUserInterceptor } from 'src/module/interceptor/get-user-interceptor';
import { UpdateReservation } from 'src/module/reservation/input/update-reservation';
import { Id } from 'src/module/shared/decorator/param/id';
import { Authorize } from 'src/module/auth/decorator/authorize';
import { CreateReservation } from 'src/module/reservation/input/create-reservation';
import { ReservationProducerService } from 'src/module/misc/app-queue/service/reservation-producer.service';

@Controller('reservation')
export class ReservationController {
  constructor(private reservationService: ReservationProducerService) {}

  @UseInterceptors(GetUserInterceptor)
  @Get('list')
  async getReservationList(
    @Req() req,
    @Query()
    { field, pageIndex, pageSize, direction }: ListReservationInput,
  ): Promise<[Reservation[], number]> {
    return Reservation.findAndCount({
      order: { [field ?? 'approved']: direction ?? 'DESC' },
      skip: pageIndex * pageSize,
      take: pageSize,
      // Getting user approved and hotel if user is authenticated
      // Since only authenticated users may access approved user and hotel of reservation
      relations: null != req.user ? ['hotel', 'changedBy'] : [],
    });
  }

  @Post()
  async createReservation(
    @Body() body: CreateReservation,
  ): Promise<{ success: boolean }> {
    return this.reservationService.addToReservationQueue(body);
  }

  @Authorize()
  @Patch(':id')
  async updateReservation(
    @Req() req,
    @Body() body: UpdateReservation,
    @Id() id: bigint,
  ): Promise<Reservation> {
    body.changedBy = req.user;
    return Reservation.findOneAndUpdate({ id, ...body });
  }
}

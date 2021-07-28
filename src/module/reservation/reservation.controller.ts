import { Body, Controller, Get, Patch, Post, Query, Req } from '@nestjs/common';
import { Reservation } from 'src/module/reservation/model/reservation';
import { ListReservationInput } from 'src/module/reservation/input/list-reservation-input';
import { UpdateReservation } from 'src/module/reservation/input/update-reservation';
import { Id } from 'src/module/shared/decorator/param/id';
import { Authorize } from 'src/module/auth/decorator/authorize';
import { CreateReservation } from 'src/module/reservation/input/create-reservation';
import { ReservationProducerService } from 'src/module/misc/app-queue/service/reservation-producer.service';
import { ListReservation } from 'src/module/reservation/model/list-reservation';

@Controller('reservation')
export class ReservationController {
  constructor(private reservationService: ReservationProducerService) {}

  // Only authenticated users can get reservation list
  @Authorize()
  @Get('list')
  async getReservationList(
    @Req() req,
    @Query()
    { field, pageIndex, pageSize, direction }: ListReservationInput,
  ): Promise<ListReservation> {
    const [items, total] = await Reservation.findAndCount({
      order: { [field ?? 'approved']: direction ?? 'DESC' },
      skip: pageIndex * pageSize,
      take: pageSize,
      relations: ['hotel', 'changedBy'],
    });
    return {
      items,
      total,
    };
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

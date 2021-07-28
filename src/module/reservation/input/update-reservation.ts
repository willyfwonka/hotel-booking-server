import { User } from 'src/module/user/model/user';
import { IsBoolean } from 'class-validator';

export class UpdateReservation {
  changedBy: User;

  @IsBoolean()
  approved: boolean;
}

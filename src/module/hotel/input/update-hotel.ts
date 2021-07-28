import { IsString, MinLength } from 'class-validator';

export class UpdateHotel {
  @IsString()
  @MinLength(3)
  name: string;
}

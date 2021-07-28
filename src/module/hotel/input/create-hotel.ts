import { IsString, MinLength } from 'class-validator';

export class CreateHotel {
  @IsString()
  @MinLength(3)
  name: string;
}

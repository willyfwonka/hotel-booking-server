import { IsString, MinLength } from 'class-validator';
import { Trim } from 'src/module/shared/decorator/transform/trim';

export class CreateHotel {
  @IsString()
  @MinLength(3)
  @Trim()
  name: string;
}

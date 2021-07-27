import { IsOptional, IsString, Length } from 'class-validator';
import { Trim } from 'src/module/shared/decorator/transform/trim';

export class UpdateUser {
  @IsOptional()
  @IsString()
  @Length(3, 16)
  @Trim()
  username: string;
}

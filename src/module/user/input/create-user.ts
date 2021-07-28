import { IsString, Length } from 'class-validator';
import { IsPassword } from 'src/module/shared/decorator/validator/is-password';
import { Match } from 'src/module/shared/decorator/validator/match';
import { Trim } from 'src/module/shared/decorator/transform/trim';

export class CreateUser {
  @IsString()
  @Length(3, 16)
  @Trim()
  username: string;

  @IsPassword()
  password: string;

  @IsPassword()
  @Match('password')
  confirmPassword: string;
}

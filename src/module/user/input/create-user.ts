import { IsString, Length } from 'class-validator';
import { IsPassword } from 'src/module/shared/decorator/validator/is-password';
import { Match } from 'src/module/shared/decorator/validator/match';

export class CreateUser {
  @IsString()
  @Length(3, 16)
  username: string;

  @IsPassword()
  password: string;

  @IsPassword()
  @Match('password')
  confirmPassword: string;
}

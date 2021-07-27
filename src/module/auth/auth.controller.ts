import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/module/auth/auth.service';
import { CreateUser } from 'src/module/user/input/create-user';
import { RateLimit } from 'src/module/auth/guard/rate-limit';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @RateLimit(2, 10)
  @Post('login')
  async login(
    @Body() body: Omit<CreateUser, 'confirmPassword'>,
  ): Promise<{ token: string }> {
    return this.authService.validate(body);
  }
}

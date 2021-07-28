import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { AuthService } from 'src/module/auth/auth.service';

@Injectable()
export class GetUserInterceptor implements NestInterceptor {
  constructor(private readonly authService: AuthService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    this.authService
      .extractUserFromToken(request.headers.authorization)
      .then((user) => {
        request.user = user;
      });
    return next.handle();
  }
}

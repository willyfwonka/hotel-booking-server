import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/module/auth/guard/jwt-auth.guard';

export const Authorize = () => applyDecorators(UseGuards(JwtAuthGuard));

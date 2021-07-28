import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/module/auth/guard/jwt-auth.guard';

// Authorization guard, must be used on protected endpoints
export const Authorize = () => applyDecorators(UseGuards(JwtAuthGuard));

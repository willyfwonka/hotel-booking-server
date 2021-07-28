import { applyDecorators, UseGuards } from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

// Binding two decorators for DRY reasons
export const RateLimit = (limit: number, ttl: number) =>
  applyDecorators(UseGuards(ThrottlerGuard), Throttle(limit, ttl));

import { Param, ParseIntPipe } from '@nestjs/common';

export function Id(): ParameterDecorator {
  return Param('id', ParseIntPipe);
}

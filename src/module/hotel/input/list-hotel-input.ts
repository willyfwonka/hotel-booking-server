import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { Transform } from 'class-transformer';

enum DirectionEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class ListHotelInput {
  query = '';

  @IsOptional()
  @IsEnum(DirectionEnum, { message: 'Invalid direction provided' })
  direction: 'ASC' | 'DESC';

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  @Min(0, { message: 'Page size must not be less than 1' })
  pageIndex = 0;

  @Transform(({ value }) => parseInt(value))
  @Min(1, { message: 'Page size must not be less than 1' })
  pageSize = 5;
}

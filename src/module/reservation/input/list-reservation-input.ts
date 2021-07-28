import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { Transform } from 'class-transformer';

enum FieldEnum {
  approved = 'approved',
  createdAt = 'createdAt',
}

enum DirectionEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class ListReservationInput {
  @IsOptional()
  @IsEnum(FieldEnum, { message: 'Invalid field name provided' })
  field: string;

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

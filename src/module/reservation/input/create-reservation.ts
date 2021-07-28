import {
  IsDateString,
  IsEmail,
  IsInt,
  IsObject,
  IsPhoneNumber,
  IsPositive,
  IsString,
  Length,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Reference } from 'src/module/shared/reference';
import { Hotel } from 'src/module/hotel/model/hotel';

export class CreateReservation {
  @Type(() => Reference)
  @ValidateNested()
  @IsObject()
  hotel: Hotel;

  @IsString()
  @Length(2, 20)
  firstName: string;

  @IsString()
  @Length(2, 20)
  lastName: string;

  @IsPhoneNumber('TR')
  phoneNumber: string;

  @IsEmail()
  email: string;

  @IsDateString()
  checkInDate: Date;

  @IsDateString()
  checkOutDate: Date;

  @IsInt()
  @IsPositive()
  @Min(0)
  @Max(4)
  guestCount: number;
}

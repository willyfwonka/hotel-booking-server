import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/module/user/model/user';
import { UpdateUser } from 'src/module/user/input/update-user';
import { CreateUser } from 'src/module/user/input/create-user';
import { Id } from 'src/module/shared/decorator/param/id';
import { RegisterProducerService } from 'src/module/misc/app-queue/service/register-producer.service';
import { RateLimit } from 'src/module/auth/guard/rate-limit';
import { Authorize } from 'src/module/auth/decorator/authorize';

@Controller('user')
export class UserController {
  constructor(private registerService: RegisterProducerService) {}

  @RateLimit(1, 10)
  @Post()
  async createUser(@Body() body: CreateUser): Promise<{ success: boolean }> {
    return this.registerService.addToRegisterQueue(body);
  }

  @Authorize()
  @RateLimit(1, 10)
  @Patch(':id')
  async updateUser(
    @Req() req,
    @Body() body: UpdateUser,
    @Id() id: bigint,
  ): Promise<User> {
    // Checking if user is trying to update another user
    // If user is not updating own, throw an http exception
    if (BigInt(id).toString() !== req?.user?.id) {
      throw new UnauthorizedException('Missing permissions');
    }

    return User.findOneAndUpdate({ id, ...body });
  }

  @Authorize()
  @RateLimit(1, 10)
  @Delete(':id')
  async deleteUser(@Req() req, @Id() id: bigint): Promise<User> {
    // Checking if user is trying to delete another user
    // If user is not deleting own, throw an http exception
    if (BigInt(id).toString() !== req?.user?.id) {
      throw new UnauthorizedException('Missing permissions');
    }

    const user = await User.findOneOrFail({ id });
    return user.softRemove();
  }
}

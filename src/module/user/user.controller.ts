import { Body, Controller, Delete, Patch, Post } from '@nestjs/common';
import { User } from 'src/module/user/model/user';
import { UpdateUser } from 'src/module/user/input/update-user';
import { CreateUser } from 'src/module/user/input/create-user';
import { Id } from 'src/module/shared/decorator/param/id';
import { RegisterProducerService } from 'src/module/misc/app-queue/service/register-producer.service';
import { RateLimit } from 'src/module/auth/guard/rate-limit';

@Controller('user')
export class UserController {
  constructor(private registerService: RegisterProducerService) {}

  @RateLimit(1, 10)
  @Post()
  async createUser(@Body() body: CreateUser): Promise<{ success: boolean }> {
    return this.registerService.addToRegisterQueue(body);
  }

  @RateLimit(1, 10)
  @Patch(':id')
  async updateUser(@Body() body: UpdateUser, @Id() id: bigint): Promise<User> {
    return User.findOneAndUpdate({ id, ...body });
  }

  @RateLimit(1, 10)
  @Delete(':id')
  async deleteUser(@Id() id: bigint): Promise<User> {
    const user = await User.findOneOrFail({ id });
    return user.softRemove();
  }
}

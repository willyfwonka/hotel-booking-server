import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/module/user/model/user';
import { compare } from 'bcrypt';
import { CreateUser } from 'src/module/user/input/create-user';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async validate({
    username,
    password,
  }: CreateUser): Promise<{ token: string }> {
    return this.validateUser(username, password).then(async (user) => {
      const payload = { username: user.username, id: user.id };
      return {
        token: await this.jwtService.signAsync(payload),
      };
    });
  }

  async validateUser(username: string, password: string): Promise<User> {
    return this.findByUsername(username).then((user) => {
      return this.comparePasswords(password, user.password).then((match) => {
        if (match) {
          return user;
        } else {
          throw new UnauthorizedException('Username or password is incorrect');
        }
      });
    });
  }

  async findByUsername(username: string): Promise<User> {
    const user = await User.findOneOrFail({ where: { username } });
    if (null == user) {
      throw new UnauthorizedException('Username or password is incorrect');
    }
    return user;
  }

  async comparePasswords(
    inputPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return compare(inputPassword, hashedPassword);
  }
}


import { Injectable, UnauthorizedException } from '@nestjs/common';
import { userDetails, UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn( data : userDetails ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(data.userName);
    if (data.userPassword !== user.userPassword) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userName };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

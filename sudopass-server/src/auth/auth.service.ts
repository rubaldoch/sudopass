import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../modules/user/user.service';


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (user && user.password === pass) {
      return { email: user.email };
    }
    return null;
  }

  async login(user: any) {
    // TODO: check if user exists
    const payload = { email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(user: any) {
    const existingUser = await this.userService.findOne(user.email);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const newUser = await this.userService.create(user);
    const payload = { email: newUser.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

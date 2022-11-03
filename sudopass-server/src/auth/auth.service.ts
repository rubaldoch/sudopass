import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../modules/user/user.service';

import { AlreadyRegisteredException } from './exceptions/alreadyRegistered.exeption';


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    // TODO: check if user exists
    // TODO: check _id value of user for payload.sub
    const payload = { username: user.email, sub: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(user: any) {
    const existingUser = await this.userService.findOne(user.email);
    if (existingUser) {
      throw new AlreadyRegisteredException();
    }

    const newUser = await this.userService.create(user);
    // TODO: check _id value of user for payload.sub
    const payload = { username: newUser.email, sub: newUser.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

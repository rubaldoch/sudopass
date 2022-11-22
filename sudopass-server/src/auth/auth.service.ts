import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { UserService } from '../modules/user/user.service';


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async existsUser(email: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (user) {
      return { email: user.email };
    }
    return { msg: 'User misspelling or not exist' };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      return { email: user.email };
    }
    return null;
  }

  async login(user: any) {
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
    const salt = await bcrypt.genSalt();
    user.password = bcrypt.hashSync(user.password, salt);
    const newUser = await this.userService.create(user);
    const payload = { email: newUser.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

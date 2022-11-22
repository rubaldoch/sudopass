import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';

import { Request } from 'express';

import { AuthService } from './auth.service';

import { LocalAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  async signup(@Req() req: Request) {
    return this.authService.signup(req.body);
  }

  @Get('user-exist/:email')
  async userExist(@Param('email') email: string) {
    return this.authService.existsUser(email);
  }
}

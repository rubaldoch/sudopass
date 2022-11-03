import { Controller, Post, Request, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';

import { LocalAuthGuard } from './guards';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  async signup(@Request() req) {
    return this.authService.signup(req.body);
  }
}

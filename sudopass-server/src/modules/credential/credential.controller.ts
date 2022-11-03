import { Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';

import { Request } from 'express';

import { CredentialService } from './credential.service';

import { JwtAuthGuard } from 'src/auth/guards';

import { Credential } from 'src/schemas/credential.schema';
import { CredentialDto } from 'src/dto/credential.dto';


@UseGuards(JwtAuthGuard)
@Controller('credential')
export class CredentialController {
  constructor(private readonly service: CredentialService) {}

  @Post()
  async create(@Req() req: Request): Promise<Credential> {
    const user = req.user as any;
    const item = req.body as CredentialDto;
    return this.service.create(user, item);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Req() req: Request): Promise<Credential>  {
    const user = req.user as any;
    const item = req.body as CredentialDto;
    return this.service.update(user, id, item);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: Request): Promise<Credential> {
    const user = req.user as any;
    return this.service.findOne(user, id);
  }

  @Get()
  async findAll(@Req() req: Request): Promise<Credential[]> {
    const user = req.user as any;
    return this.service.findAll(user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request): Promise<Credential> {
    const user = req.user as any;
    return this.service.delete(user, id);
  }
}

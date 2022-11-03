import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';

import { CredentialService } from './credential.service';

import { JwtAuthGuard } from 'src/auth/guards';

import { Credential } from 'src/schemas/credential.schema';
import { CredentialDto } from 'src/dto/credential.dto';


@UseGuards(JwtAuthGuard)
@Controller('credential')
export class CredentialController {
  constructor(private readonly service: CredentialService) {}

  @Post()
  async create(@Body() item: CredentialDto): Promise<Credential> {
    return this.service.create(item);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() item: CredentialDto): Promise<Credential>  {
    return this.service.update(id, item);
  }

  @Get()
  async findAll(): Promise<Credential[]> {
    return this.service.findAll();
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Credential> {
    return this.service.delete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Credential, CredentialDocument } from 'src/schemas/credential.schema';
import { CredentialDto } from 'src/dto/credential.dto';


@Injectable()
export class CredentialService {
  constructor(@InjectModel(Credential.name) private model: Model<CredentialDocument>) {}

  async create(itemDto: CredentialDto): Promise<Credential> {
    itemDto.lastUpdate = new Date(Date.now());
    const item = new this.model(itemDto);
    return item.save();
  }

  async update(id: string, itemDto: CredentialDto): Promise<Credential> {
    itemDto.lastUpdate = new Date(Date.now());
    return this.model.findOneAndUpdate({ _id: id }, itemDto);
  }

  async delete(id: string): Promise<Credential> {
    return this.model.findOneAndDelete({ _id: id });
  }

  async findAll(): Promise<Credential[]> {
    return this.model.find().exec();
  }

  async findOne(id: string): Promise<Credential> {
    return this.model.findOne({ _id: id }).exec();
  }
}

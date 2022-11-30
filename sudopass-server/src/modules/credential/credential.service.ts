import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { UserService } from '../user/user.service';

import { Credential, CredentialDocument } from 'src/schemas/credential.schema';
import { CredentialDto } from 'src/dto/credential.dto';

@Injectable()
export class CredentialService {
  constructor(
    @InjectModel(Credential.name) private model: Model<CredentialDocument>,
    private userService: UserService,
  ) {}

  async create(auth: any, itemDto: CredentialDto): Promise<Credential> {
    itemDto.lastUpdate = new Date(Date.now());
    const user = await this.userService.findOne(auth.email);
    delete itemDto._id;
    const item = new this.model(itemDto);
    const credential = await item.save();
    await this.userService.pushCredential(user.email, credential);
    return credential;
  }

  async update(
    auth: any,
    id: string,
    itemDto: CredentialDto,
  ): Promise<Credential> {
    itemDto.lastUpdate = new Date(Date.now());
    await this.findOne(auth, id);
    return this.model.findOneAndUpdate({ _id: id }, itemDto);
  }

  async delete(auth: any, id: string): Promise<Credential> {
    await this.findOne(auth, id);
    return this.model.findOneAndDelete({ _id: id });
  }

  async findAll(auth: any): Promise<Credential[]> {
    return this.userService.readAllCredentials(auth.email);
  }

  async findOne(auth: any, id: string): Promise<Credential> {
    const user = await this.userService.findOneByCredential(auth.email, id);
    if (!user) {
      throw new BadRequestException(
        `User ${auth.email} not found with credential ${id}`,
      );
    }
    return this.model.findOne({ _id: id }).exec();
  }
}

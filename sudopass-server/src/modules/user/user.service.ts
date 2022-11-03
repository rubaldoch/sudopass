import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { User, UserDocument } from 'src/schemas/user.schema';
import { UserDto } from 'src/dto/user.dto';
import { Credential } from 'src/schemas/credential.schema';


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

  async create(itemDto: UserDto): Promise<User> {
    const item = new this.model(itemDto);
    return item.save();
  }

  async update(id: string, itemDto: UserDto): Promise<User> {
    return this.model.findOneAndUpdate({ _id: id }, itemDto);
  }

  async findAll(): Promise<User[]> {
    return this.model.find().exec();
  }

  async findOne(email: string): Promise<User> {
    return this.model.findOne({ email: email }).exec();
  }

  async findOneByCredential(email: string, credentialId: string): Promise<User> {
    return this.model.findOne({ email: email, credentials: { $elemMatch: { $eq: credentialId } } }).exec();
  }

  async pushCredential(email: string, credential: Credential): Promise<User> {
    return this.model.findOneAndUpdate({ email: email }, { $push: { credentials: credential } });
  }

  async readAllCredentials(email: string): Promise<Credential[]> {
    const user = await this.model.findOne({ email: email }).populate('credentials').exec();
    return user.credentials;
  }
}

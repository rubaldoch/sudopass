import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

import { Credential } from './credential.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  alias: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Credential' }] })
  credentials: Credential[];
}

export const UserSchema = SchemaFactory.createForClass(User);
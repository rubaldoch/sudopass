import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CredentialDocument = Credential & Document;

@Schema()
export class Credential {
  @Prop({ required: true })
  domainAlias: string;

  @Prop({ required: true })
  domain: string;

  @Prop({ required: true })
  user: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  lastUpdate: Date;
}

export const CredentialSchema = SchemaFactory.createForClass(Credential);
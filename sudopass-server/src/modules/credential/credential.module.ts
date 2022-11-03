import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CredentialController } from './credential.controller';
import { CredentialService } from './credential.service';

import { Credential, CredentialSchema } from 'src/schemas/credential.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: Credential.name, schema: CredentialSchema }])],
  controllers: [CredentialController],
  providers: [CredentialService],
})
export class CredentialModule {}

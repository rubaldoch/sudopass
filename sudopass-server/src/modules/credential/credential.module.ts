import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from '../user/user.module';

import { CredentialController } from './credential.controller';
import { CredentialService } from './credential.service';

import { Credential, CredentialSchema } from 'src/schemas/credential.schema';


@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: Credential.name, schema: CredentialSchema }])
  ],
  controllers: [CredentialController],
  providers: [CredentialService],
})
export class CredentialModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CredentialModule } from './modules/credential/credential.module';


@Module({
  imports: [
    AuthModule,
    UserModule,
    CredentialModule,
    MongooseModule.forRoot('mongodb://localhost/sudopass')
  ]
})
export class AppModule {}

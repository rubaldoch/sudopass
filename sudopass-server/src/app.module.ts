import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CredentialModule } from './modules/credential/credential.module';

const url = process.env.MONGO_HOSTNAME || 'localhost';
const dbName = process.env.MONGO_DATABASE || 'sudopass';
@Module({
  imports: [
    AuthModule,
    UserModule,
    CredentialModule,
    MongooseModule.forRoot(`mongodb://${url}/${dbName}`),
  ],
})
export class AppModule {}

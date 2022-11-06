import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CredentialModule } from './modules/credential/credential.module';

const url = process.env.MONGO_HOSTNAME || 'mongodb';
const port = process.env.MONGO_PORT || '27017';
@Module({
  imports: [
    AuthModule,
    UserModule,
    CredentialModule,
    MongooseModule.forRoot(`mongodb://${url}:${port}`),
  ],
})
export class AppModule {}

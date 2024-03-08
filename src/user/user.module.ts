import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userEntity } from './models/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports:[
  TypeOrmModule.forFeature([userEntity]),
  JwtModule.register({
    secret: 'myLongAndSecureSecretKey123!@#$', // Provide your secret key here
    signOptions: { expiresIn: '1d' }, // Adjust expiration as needed
  }),
],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}

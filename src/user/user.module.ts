import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userEntity } from './models/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { BraintreeProvider } from './braintree.provider';
import { MailerModule } from '@nestjs-modules/mailer';
import { GoogleProvider } from './google.provider';

@Module({
  imports:[
  TypeOrmModule.forFeature([userEntity]),
  JwtModule.register({
    secret: 'myLongAndSecureSecretKey123!@#$', // Provide your secret key here
    signOptions: { expiresIn: '1d' }, // Adjust expiration as needed
  }),
  MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: "arwaarij12344@gmail.com",
          pass: "fqar odmz ycmm yvan",
        },
      },
      defaults: {
        from: 'PIZZA TIME <arwaarij12344@gmail.com>',
      },
    }
  ),
],
  providers: [UserService,BraintreeProvider,GoogleProvider],
  controllers: [UserController]
})
export class UserModule {}

// facebook.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';

@Injectable()
export class FacebookProvider extends PassportStrategy(Strategy, 'facebook') {
    constructor() {
        super({
            clientID: process.env.Facebook_clientID,
            clientSecret: process.env.Facebook_clientSecret,
            callbackURL: "http://localhost:8080/api/user/auth/facebook/callback",
            profileFields: ['id', 'emails', 'name'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: Function) {
        // Implement your validation logic here
        const user = {
            accessToken,
            name: profile.name,
            email: profile.emails && profile.emails[0].value,
        };

        done(null, user);
    }
}

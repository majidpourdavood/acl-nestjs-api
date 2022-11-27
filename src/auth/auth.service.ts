import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {UserService} from 'src/user/user.service';
import * as moment from 'jalali-moment';
import {Helpers} from "../helpers/helpers";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {
    }

    async validateUser(username: string, password: string) {
        const user = await this.userService.findByUserName(username);
        if (user && user.password === password) {
            return user;
        }

        return null;
    }


    async getToken(refresh) {

        let decodedToken = this.jwtService.verify(refresh,
            {
                secret: process.env.REFRESH_TOKEN_SECRET
            });
        const user = await this.userService.findByUserName(decodedToken.username);
        const payload = {username: decodedToken.username, sub: decodedToken.id};

        const token = this.jwtService.sign(
            payload,
            {
                secret: process.env.ACCESS_TOKEN_SECRET
                , expiresIn: process.env.ACCESS_TOKEN_LIFE
            }
        );
        const refreshToken = this.jwtService.sign(payload,
            {
                secret: process.env.REFRESH_TOKEN_SECRET
                , expiresIn: process.env.REFRESH_TOKEN_LIFE
            });

        let expireToken = moment().unix() + parseInt(process.env.ACCESS_TOKEN_LIFE) / 1000;
        let expireRefreshToken = moment().unix() + parseInt(process.env.REFRESH_TOKEN_LIFE) / 1000;
        let userData = {
            "email": user.email + "",
            "username": user.username + "",
            "expireType": "timestamp seconds",
            "token": token + "",
            "expireToken": expireToken + "",
            "refreshToken": refreshToken + "",
            "expireRefreshToken": expireRefreshToken + "",
        };

        return Helpers.sendJson(201, [],
            "get token", "getToken", userData);

    }

    getUserName(token) {
        let decodedToken = this.jwtService.verify(token,
            {
                secret: process.env.ACCESS_TOKEN_SECRET
            });

        return decodedToken.username;
    }

    async login(user: any) {
        const payload = {username: user.username, sub: user.id};

        const token = this.jwtService.sign(
            payload,
            {
                secret: process.env.ACCESS_TOKEN_SECRET
                , expiresIn: process.env.ACCESS_TOKEN_LIFE
            }
        );
        const refreshToken = this.jwtService.sign(payload,
            {
                secret: process.env.REFRESH_TOKEN_SECRET
                , expiresIn: process.env.REFRESH_TOKEN_LIFE
            });

        let expireToken = moment().unix() + parseInt(process.env.ACCESS_TOKEN_LIFE) / 1000;
        let expireRefreshToken = moment().unix() + parseInt(process.env.REFRESH_TOKEN_LIFE) / 1000;
        let userData = {
            "email": user.email + "",
            "username": user.username + "",
            "expireType": "timestamp seconds",
            "token": token + "",
            "expireToken": expireToken + "",
            "refreshToken": refreshToken + "",
            "expireRefreshToken": expireRefreshToken + "",
        };
        return Helpers.sendJson(201, [],
            "get token", "getToken", userData);

    }
}

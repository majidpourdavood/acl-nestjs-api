import { Injectable } from '@nestjs/common';
import {UserService} from "../user/user.service";
import {AuthService} from "../auth/auth.service";
import {Helpers} from "../helpers/helpers";


@Injectable()
export class ProfileService {
  constructor(
      private userService: UserService,
      private authService: AuthService,
  ) {}


  public async profile(authorization: any): Promise<any> {

    if (!authorization) {
      let response = Helpers.sendJson(0, [],
          [], "NotAuthenticated", {});
      return response;
    }
    const token = authorization.split(' ')[1];
    let username;
    try {

      let username = this.authService.getUserName(token);
      let user = await this.userService.findByUserName(username);
      return user;
    } catch (err) {
      let response = Helpers.sendJson(0, [],
          err.toString(), "ServerError", {});
      return response;
    }

  }



}

import {Controller, Get, HttpException, Request, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {Helpers} from "../helpers/helpers";
import {ProfileService} from "./profile.service";

@Controller('profile')
export class ProfileController {

  constructor(private profileService: ProfileService) {
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  public async  profile(@Request() req: any) {

    try {
      return this.profileService.profile(req.headers.authorization).then(user => {
        return Helpers.sendJson(200, [],
            "Get Profile", "GetProfile", user);
      }).catch(error => {
        throw new HttpException(error.toString(), 500);
      });
    } catch (error) {
      throw new HttpException(error.toString(), 500);
    }

  }


}

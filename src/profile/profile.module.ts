import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import {ProfileService} from "./profile.service";
import {AuthModule} from "../auth/auth.module";
import {UserModule} from "../user/user.module";

@Module({
  imports: [
    AuthModule,
    UserModule,
  ],
  controllers: [ProfileController],
  providers: [ProfileService,],
  exports:[ProfileService]
})
export class ProfileModule {}

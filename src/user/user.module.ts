import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "./schemas/user.schema";


@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],

})
export class UserModule {}

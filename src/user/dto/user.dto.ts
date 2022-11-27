import {IsArray, IsEmail, IsString} from 'class-validator';

export class UserDto {

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  image: string;

  @IsArray()
  roles: Array<string>;

}


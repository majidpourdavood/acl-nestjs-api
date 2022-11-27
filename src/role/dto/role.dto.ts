
import {IsArray, IsString} from 'class-validator';

export class RoleDto {

  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsString()
  description: string;

  @IsArray()
  permissions: [];
}


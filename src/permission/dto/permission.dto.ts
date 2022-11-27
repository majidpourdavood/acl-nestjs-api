
import { IsString} from 'class-validator';

export class PermissionDto {

  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsString()
  description: string;

}


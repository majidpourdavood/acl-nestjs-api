import {
  Body,
  Controller,
  Delete,
  Get, HttpException,
  Param, Patch,
  Post,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionDto } from './dto/permission.dto';
import {Helpers} from "../helpers/helpers";

@Controller('permission')
export class PermissionController {
  constructor(private permissionService: PermissionService

  ) {}

  @Get('/all')
  public async getPermissions() {

    try {
      return this.permissionService.getPermissions().then(permissions => {
        return Helpers.sendJson(200, [],
            "get Permissions", "getPermissions", permissions);
      }).catch(error => {
        throw new HttpException(error.toString(), 500);
      });
    } catch (error) {
      throw new HttpException(error.toString(), 500);
    }

  }

  @Post('/store')
  public async postPermission(@Body() permission: PermissionDto) {
    try {
      return this.permissionService.postPermission(permission).then(permissionRes => {
        return Helpers.sendJson(201, [],
            "Permission Created", "PermissionCreated", permissionRes);
      }).catch(error => {
        throw new HttpException(error.toString(), 500);
      });
    } catch (error) {
      throw new HttpException(error.toString(), 500);
    }

  }

  @Get(':id')
  public async getPermissionById(@Param('id') id: any) {

    try {
      return this.permissionService.getPermissionById(id).then(permission => {
        return Helpers.sendJson(200, [],
            "Get Permission", "GetPermission", permission);
      }).catch(error => {
        throw new HttpException(error.toString(), 500);
      });
    } catch (error) {
      throw new HttpException(error.toString(), 500);
    }

  }


  @Get(':slug')
  public async getPermissionBySlug(@Param('slug') slug: string) {

    try {
      return this.permissionService.getPermissionBySlug(slug).then(permission => {
        return Helpers.sendJson(200, [],
            "Get Permission", "GetPermission", permission);
      }).catch(error => {
        throw new HttpException(error.toString(), 500);
      });
    } catch (error) {
      throw new HttpException(error.toString(), 500);
    }

  }

  @Delete('/delete/:id')
  public async deletePermissionById(@Param('id') id: any) {

    try {
      return this.permissionService.deletePermissionById(id).then(permission => {
        return Helpers.sendJson(200, [],
            "Delete Permission", "DeletePermission", permission);
      }).catch(error => {
        throw new HttpException(error.toString(), 500);
      });
    } catch (error) {
      throw new HttpException(error.toString(), 500);
    }
  }


  @Patch('/update/:id')
  public async update(
      @Body() permission: PermissionDto,
      @Param('id') id: any
  ) {
    try {

      return await this.permissionService.update(id, permission).then(permissionRes => {
        return Helpers.sendJson(200, [],
            "Update Permission", "UpdatePermission", permissionRes);
      }).catch(error => {
        throw new HttpException(error.toString(), 500);
      });
    } catch (error) {
      throw new HttpException(error.toString(), 500);
    }

  }
}

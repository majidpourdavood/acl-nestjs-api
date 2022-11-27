import { Injectable, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IPermission } from './interfaces/permission.interface';
import { PermissionDto } from './dto/permission.dto';


const permissionProjection = {
  __v: false,
};

@Injectable()
export class PermissionService {
  constructor(@InjectModel('Permission') private readonly permissionModel: Model<IPermission>
  ) {}

  public async getPermissions(): Promise<PermissionDto[]> {
    const permissions = await this.permissionModel.find({}, permissionProjection).exec();
    if (!permissions || !permissions[0]) {
      throw new HttpException('Not Found', 404);
    }
    return permissions;
  }

  public async postPermission(newPermission: PermissionDto) {
    const permission = await new this.permissionModel(newPermission);
    return permission.save();
  }

  public async getPermissionById(id: any): Promise<PermissionDto> {
    const permission = await this.permissionModel.findOne({ _id: id }, permissionProjection).exec();
    if (!permission) {
      throw new HttpException('Not Found', 404);
    }
    return permission;
  }

  public async getPermissionBySlug(slug: string): Promise<IPermission> {
    const permission = await this.permissionModel.findOne({ slug }, permissionProjection).exec();
    if (!permission) {
      throw new HttpException('Not Found', 404);
    }
    return permission;
  }


  public async deletePermissionById(id: any): Promise<any> {
    const permission = await this.permissionModel.deleteOne({ _id: id }).exec();
    if (permission.deletedCount === 0) {
      throw new HttpException('Not Found', 404);
    }
    return permission;
  }

  public async update(
      id: number,
      updatePermission: PermissionDto,
  ): Promise<PermissionDto> {

    let permission = await this.permissionModel
        .findOneAndUpdate(
            { _id: id},
            updatePermission
        )
        .exec();
    if (!permission) {
      throw new HttpException('Not Found', 404);
    }
    return permission;
  }
}

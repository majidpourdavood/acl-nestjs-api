import {Injectable, HttpException} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {IRole} from './interfaces/role.interface';
import {RoleDto} from './dto/role.dto';

const roleProjection = {
    __v: false,
};

@Injectable()
export class RoleService {
    constructor(@InjectModel('Role') private readonly roleModel: Model<IRole>) {
    }

    public async getRoles(): Promise<RoleDto[]> {
        const roles = await this.roleModel.find({}, roleProjection).exec();
        if (!roles || !roles[0]) {
            throw new HttpException('Not Found', 404);
        }
        return roles;
    }

    public async postRole(newRole: RoleDto) {
        const role = await new this.roleModel(newRole);
        return role.save();
    }

    public async getRoleById(id: number): Promise<RoleDto> {
        const role = await this.roleModel.findOne({_id: id}, roleProjection).exec();
        if (!role) {
            throw new HttpException('Not Found', 404);
        }
        return role;
    }

    public async getRoleForUser(userRoles: any): Promise<RoleDto[]> {
        const roles = await this.roleModel.find({
            _id: {$in: userRoles}
        }).exec();
        if (!roles || !roles[0]) {
            throw new HttpException('Not Found', 404);
        }
        return roles;
    }


    public async deleteRoleById(id: number): Promise<any> {
        const role = await this.roleModel.deleteOne({_id: id}).exec();
        if (role.deletedCount === 0) {
            throw new HttpException('Not Found', 404);
        }
        return role;
    }

    public async update(
        id: number,
        updateRole: RoleDto,
    ): Promise<RoleDto> {
        // return updateRole;
        const role = await this.roleModel
            .findOneAndUpdate(
                {_id: id},
                updateRole
                ,
            )
            .exec();
        if (!role) {
            throw new HttpException('Not Found', 404);
        }
        return role;
    }

}

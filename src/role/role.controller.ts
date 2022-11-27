import {
    Body,
    Controller,
    Delete,
    Get, HttpException,
    Param, Patch,
    Post,
} from '@nestjs/common';
import {RoleService} from './role.service';
import {RoleDto} from './dto/role.dto';
import {Helpers} from "../helpers/helpers";

@Controller('role')
export class RoleController {
    constructor(private roleService: RoleService) {
    }

    @Get('/all')
    public async getRoles() {

        try {
            return this.roleService.getRoles().then(roles => {
                return Helpers.sendJson(200, [],
                    "get Roles", "getRoles", roles);
            }).catch(error => {
                throw new HttpException(error.toString(), 500);
            });
        } catch (error) {
            throw new HttpException(error.toString(), 500);
        }

    }

    @Post('/store')
    public async postRole(@Body() role: RoleDto) {
        try {
            return this.roleService.postRole(role).then(roleRes => {
                return Helpers.sendJson(201, [],
                    "Role Created", "RoleCreated", roleRes);
            }).catch(error => {
                throw new HttpException(error.toString(), 500);
            });
        } catch (error) {
            throw new HttpException(error.toString(), 500);
        }

    }

    @Get(':id')
    public async getRoleById(@Param('id') id: any) {

        try {
            return this.roleService.getRoleById(id).then(role => {
                return Helpers.sendJson(200, [],
                    "Get Role", "GetRole", role);
            }).catch(error => {
                throw new HttpException(error.toString(), 500);
            });
        } catch (error) {
            throw new HttpException(error.toString(), 500);
        }

    }

    @Delete('/delete/:id')
    public async deleteRoleById(@Param('id') id: any) {

        try {
            return this.roleService.deleteRoleById(id).then(role => {
                return Helpers.sendJson(200, [],
                    "Delete Role", "DeleteRole", role);
            }).catch(error => {
                throw new HttpException(error.toString(), 500);
            });
        } catch (error) {
            throw new HttpException(error.toString(), 500);
        }
    }


    @Patch('/update/:id')
    public async update(
        @Body() role: RoleDto,
        @Param('id') id: any
    ) {
        try {
            return this.roleService.update(id, role).then(roleRes => {
                return Helpers.sendJson(200, [],
                    "Update Role", "UpdateRole", roleRes);
            }).catch(error => {
                throw new HttpException(error.toString(), 500);
            });
        } catch (error) {
            throw new HttpException(error.toString(), 500);
        }

    }

}

import {
    Body,
    Controller,
    Delete,
    Get, HttpException,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import {UserDto} from './dto/user.dto';
import {UserService} from './user.service';
import {Helpers} from "../helpers/helpers";



@Controller('user')
export class UserController {
    constructor(private userService: UserService) {
    }

    @Get('/all')
    public async getUsers() {

        try {
            return this.userService.get().then(users => {
                return Helpers.sendJson(200, [],
                    "get Users", "getUsers", users);
            }).catch(error => {
                throw new HttpException(error.toString(), 500);
            });
        } catch (error) {
            throw new HttpException(error.toString(), 500);
        }

    }

    @Post('/store')
    public async store(@Body() user: UserDto) {
        try {
            return this.userService.create(user).then(userRes => {
                return Helpers.sendJson(201, [],
                    "User Created", "UserCreated", userRes);
            }).catch(error => {
                throw new HttpException(error.toString(), 500);
            });
        } catch (error) {
            throw new HttpException(error.toString(), 500);
        }
    }

    @Get(':id')
    public async getUser(@Param('id') id: any) {

        try {
            return this.userService.show(id).then(user => {
                return Helpers.sendJson(200, [],
                    "Get User", "GetUser", user);
            }).catch(error => {
                throw new HttpException(error.toString(), 500);
            });
        } catch (error) {
            throw new HttpException(error.toString(), 500);
        }

    }

    @Delete('/delete/:id')
    public async deleteUserById(@Param('id') id: any) {

        try {
            return this.userService.delete(id).then(user => {
                return Helpers.sendJson(200, [],
                    "Delete User", "DeleteUser", user);
            }).catch(error => {
                throw new HttpException(error.toString(), 500);
            });
        } catch (error) {
            throw new HttpException(error.toString(), 500);
        }
    }


    @Patch('/update/:id')
    public async update(
        @Body() user: UserDto,
        @Param('id') id: any
    ) {
        try {
            return this.userService.update(id, user).then(userRes => {
                return Helpers.sendJson(200, [],
                    "Update User", "UpdateUser", userRes);
            }).catch(error => {
                throw new HttpException(error.toString(), 500);
            });
        } catch (error) {
            throw new HttpException(error.toString(), 500);
        }

    }

}

import {Injectable, HttpException} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {IUser} from './interfaces/user.interface';
import {UserDto} from "./dto/user.dto";

const userProjection = {
    __v: false,
};

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {
    }


    public async get(): Promise<UserDto[]> {
        const users = await this.userModel.find({}, userProjection).exec();
        if (!users || !users[0]) {
            throw new HttpException('Not Found', 404);
        }
        return users;
    }


    public async create(newUser: UserDto) {

        const user = await new this.userModel(newUser);
        return user.save();

    }


    public async update(
        id: any,
        updateUser: UserDto,
    ): Promise<UserDto> {
        const user = await this.userModel
            .findOneAndUpdate(
                {_id: id},
                    updateUser
            )
            .exec();
        if (!user) {
            throw new HttpException('Not Found', 404);
        }
        return user;
    }


    public async findByUserName(username: string): Promise<UserDto> {
        const user = await this.userModel.findOne({username}, userProjection).exec();
        if (!user) {
            throw new HttpException('Not Found', 404);
        }
        return user;
    }

    public async show(id: any): Promise<UserDto> {
        const user = await this.userModel.findOne({_id: id}, userProjection).exec();
        if (!user) {
            throw new HttpException('Not Found', 404);
        }
        return user;
    }

    public async delete(id: any): Promise<any> {
        const user = await this.userModel.deleteOne({_id: id}).exec();
        if (user.deletedCount === 0) {
            throw new HttpException('Not Found', 404);
        }
        return user;
    }

}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './model/user.model';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async getUsers() {
        return await this.userModel.find({});
    }

    async createUser(user: any): Promise<User>
    {
        const newUser = new this.userModel(user);
        return await newUser.save();
    }

    updateUser(id: string, user: any) {
        return {
            id,
            name: user.name,
            email: user.email,
        };
    }
}

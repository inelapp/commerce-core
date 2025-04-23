import { HttpException, Injectable } from '@nestjs/common';
import { CreateUser, CreateUserRequestDto, GetUser, GetUserRequestDto, SignIn, SignInRequestDto } from '../UseCases';

@Injectable()
export class AuthService {
    constructor(
        private readonly _getUser: GetUser,
        private readonly _signIn: SignIn,
        private readonly _createUser: CreateUser
    ) {}

    async getUser(props: GetUserRequestDto) {
        const result = await this._getUser.execute(props);
        if (result.isErr()) {
            const error = result.error;
            throw new HttpException(error.message, error.getStatus(), {
                cause: error,
            });
        }
        return result.value;
    }

    async signIn(request: SignInRequestDto) {
        const result = await this._signIn.execute({ ...request, merchant: '680475d58c6ce2b9e4725210' });
        if (result.isErr()) {
            const error = result.error;
            throw new HttpException(error.message, error.getStatus(), {
                cause: error,
            });
        }
        return result.value;        
    }

    async createUser(request: CreateUserRequestDto) {
        const result = await this._createUser.execute({ ...request, merchant: '680475d58c6ce2b9e4725210' });
        if (result.isErr()) {
            const error = result.error;
            throw new HttpException(error.message, error.getStatus(), {
                cause: error,
            });
        }
        return result.value;
    }
}

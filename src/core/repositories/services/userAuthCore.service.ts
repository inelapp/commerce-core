import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserFilters, IUserAuthRepository, RefreshTokenFilters } from '../userAuth.repository';
import { User as UserModel } from '../../model/user';
import { getDataByFilters, getPaginateAndFilteredData, IPaginateData } from '../../../utils';
import { UserDbResponseDetail, UserAuthMaps, UserResponseDetail, IRefreshTokenResponseDb } from '../../mappers';
import { IRefreshTokenProps, RefreshToken, UserProps } from '../../../core/domain';
import { GenericOptions } from '../../../types';

@Injectable()
export class UserAuthCoreService implements IUserAuthRepository{
    constructor(
        @InjectModel('User') private readonly userModel: Model<UserModel>,
        @InjectModel('RefreshToken') private readonly refreshTokenModel: Model<RefreshToken>,
    ) {}
    async createUser(user: UserProps): Promise<UserResponseDetail> {
        const session = await this.userModel.startSession();
        try {
            return await session.withTransaction(async () => {
                const newUser = new this.userModel(user, null, { session });
                const { id } = await newUser.save({ session });
                const userById = await getDataByFilters<UserDbResponseDetail, { id: string }>(this.userModel, { id }, ['merchant'], session);
                return userById ? UserAuthMaps.toDomainDetail(userById) : null;
            })
        } catch (error) {
            console.log('error in create User ==>', error);
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }

    async getUsers(filters: IUserFilters, options?: GenericOptions): Promise<IPaginateData<UserResponseDetail>> {
        try {
            const { page, limit, ...query } = filters;
            const result = await getPaginateAndFilteredData<UserDbResponseDetail, IUserFilters>(page, limit, this.userModel, query, ['merchant'])
            const userMap = result.data.map((user) => UserAuthMaps.toDomainDetail(user, options?.showSensibleData))
            return {
                ...result,
                data: userMap
            }
        } catch (error) {
            throw error;
        }
    }
    async createRefreshToken(props: IRefreshTokenProps, deleteOld?: boolean): Promise<RefreshToken> {
        const session = await this.refreshTokenModel.startSession();
        try {
            return await session.withTransaction(async () => {
                const lastUserRefreshToken = await this.refreshTokenModel.findOne({ userId: props.userId, isRevoked: false }, null, { session }).sort({ createdAt: -1 });
                if (lastUserRefreshToken && deleteOld) {
                    await this.refreshTokenModel.findByIdAndDelete(lastUserRefreshToken._id, { session });
                }
                const newRefreshToken = new this.refreshTokenModel(props, null, { session });
                const refreshTokenSaved = await newRefreshToken.save({ session });
                return UserAuthMaps.fromRefreshTokenDbToDomain(refreshTokenSaved as unknown as IRefreshTokenResponseDb);
            });
        } catch (error) {
            console.log('error in create refresh token ==>', error);
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    }
    async revokeToken(filters: RefreshTokenFilters): Promise<void> {
        try {
            const refreshToken = await getDataByFilters<IRefreshTokenResponseDb, RefreshTokenFilters>(this.refreshTokenModel, filters);
            await this.refreshTokenModel.findByIdAndUpdate(refreshToken.id, { isRevoked: true });
        } catch (error) {
            throw error;
        }
    }
    async getRefreshTokenByToken(token: string): Promise<RefreshToken | null> {
        try {
            const refreshToken = await getDataByFilters<IRefreshTokenResponseDb, { token: string }>(this.refreshTokenModel, { token });
            return refreshToken ? UserAuthMaps.fromRefreshTokenDbToDomain(refreshToken) : null;
        } catch (error) {
            throw error;
        }
    }

    async getUser(filters: IUserFilters, options?: GenericOptions): Promise<UserResponseDetail | null> {
        try {
            console.log('filters in getUser ==>', filters);
            const user = await getDataByFilters<UserDbResponseDetail, IUserFilters>(this.userModel, { ...filters, ...options }, ['merchant']);
            return user ? UserAuthMaps.toDomainDetail(user, options?.showSensibleData) : null;
        } catch (error) {
            throw error;
        }
    }
}

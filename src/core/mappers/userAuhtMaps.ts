import { Document } from "mongoose";
import { RefreshToken, User } from "../domain";
import { IMerchantDbResponse } from "./merchantMaps";

export interface IUserDbResponse {
    _id: string;
    username: string;
    email: string;
    password: string;
    roles: string[];
    merchant: string;
    tokenVersion: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IRefreshTokenDbResponse {
    _id: string;
    token: string;
    userId: string;
    expiresAt: Date;
    deviceInfo?:
      | {
          browser: string;
          os: string;
          device: string;
        }
      | string;
    isRevoked: boolean;
    createdAt: Date;
    updatedAt: Date;
  }

export type IRefreshTokenResponseDb = IRefreshTokenDbResponse & Document;

export type UserDbResponseDetail = Omit<IUserDbResponse, 'merchant'> & Partial<{ merchant: IMerchantDbResponse }>
export type UserResponseDetail = Omit<User, 'merchant'> & { merchant: Partial<Omit<IMerchantDbResponse, '_id'> & { id: string }> }

export class UserAuthMaps {
    static toDomainDetail(user: UserDbResponseDetail, showSensibleData: boolean = false): UserResponseDetail {
        return {
            id: user._id,
            username: user.username || '',
            email: user.email || '',
            password: showSensibleData ? user.password : undefined,
            roles: user.roles || [],
            status: user.status || '',
            merchant: user.merchant ? {
                id: user.merchant._id,
                name: user.merchant.name || ''
            }: null,
            tokenVersion: user.tokenVersion,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
    }
    static fromRefreshTokenDbToDomain(refreshTokenDb: IRefreshTokenResponseDb): RefreshToken {
        return {
          id: refreshTokenDb._id?.toString(),
          userId: refreshTokenDb.userId.toString(),
          token: refreshTokenDb.token,
          expiresAt: refreshTokenDb.expiresAt,
          deviceInfo: refreshTokenDb.deviceInfo,
          isRevoked: refreshTokenDb.isRevoked,
          createdAt: refreshTokenDb.createdAt,
          updatedAt: refreshTokenDb.updatedAt
        };
    }
}
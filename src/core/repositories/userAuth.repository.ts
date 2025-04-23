import { IPaginateData } from "../../utils";
import { GenericFilters, GenericOptions } from "../../types";
import { IRefreshTokenProps, RefreshToken, UserProps } from "../domain";
import { UserResponseDetail } from "../mappers/userAuhtMaps";

export type IUserFilters = {
    id?: string;
    email?: string;
    username?: string;
    roles?: string[];
    status?: string;
    merchant?: string;
} & GenericFilters

export type RefreshTokenFilters = {
    id?: string;
    userId?: string;
    token?: string;
};

export interface IUserAuthRepository {
    getUser(filters: IUserFilters, options?: GenericOptions): Promise<UserResponseDetail | null>;
    getUsers(filters: IUserFilters, options?: GenericOptions): Promise<IPaginateData<UserResponseDetail>>;
    createUser(user: UserProps): Promise<UserResponseDetail>;
    createRefreshToken(props: IRefreshTokenProps, deleteOld?: boolean): Promise<RefreshToken>;
    revokeToken(filters: RefreshTokenFilters): Promise<void>;
    getRefreshTokenByToken(token: string): Promise<RefreshToken | null>;
}
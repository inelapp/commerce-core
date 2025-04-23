export interface CreateUserRequestDto {
    username?: string;
    email: string;
    password: string;
    merchant: string;
    roles?: string[];
}
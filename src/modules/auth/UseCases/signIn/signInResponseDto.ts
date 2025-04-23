export interface SignInResponseDto {
    accessToken: string;
    refreshToken?: string;
    expiresIn: number;
}
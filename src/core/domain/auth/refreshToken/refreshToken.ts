import { DefaultProps } from "../../../../core/shared";

export interface IRefreshTokenProps {
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
}

export class RefreshToken extends DefaultProps{
    id: string;
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

    constructor(props: IRefreshTokenProps) {
        super();
        Object.assign(this, props);
    }

    static create(props: IRefreshTokenProps): RefreshToken {
        return new RefreshToken(props);
    }
}

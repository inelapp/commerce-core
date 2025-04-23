import { DefaultProps } from "../../../shared";

interface IOptionalUserProps {
    id: string;
    username: string;
    roles: string[];
    status: string;
    tokenVersion: number;
}

interface IRequiredUserProps {
    email: string;
    password: string;
    merchant: string;
}

export type UserProps = Required<IRequiredUserProps> & Partial<IOptionalUserProps>;

export class User extends DefaultProps{
    id: string;
    username: string;
    email: string;
    password: string;
    merchant: string;
    tokenVersion: number;
    roles: string[];
    status: string;

    constructor(props: UserProps){
        super();
        Object.assign(this, props);
    }

    static create(props: UserProps): User {
        return new User(props);
    }
}
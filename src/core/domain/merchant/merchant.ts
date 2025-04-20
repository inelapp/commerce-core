import { DefaultProps } from "../../../core/shared";

export class Merchant extends DefaultProps {
    id: string;
    name: string;
    slug: string;
    email: string;
    contactPhoneNumber: string;
    status: string;
}
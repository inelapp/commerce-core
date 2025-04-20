import { DefaultProps } from "../../../core/shared";

export interface IOptionalCategoryProps {
    id: string;
    parents: string[];
    img: string;
    description: string;
    status: string;
}

export interface IRequiredCategoryProps {
    merchant: string;
    name: string;
}

export type CategoryProps = Required<IRequiredCategoryProps> & Partial<IOptionalCategoryProps>;

export class Category extends DefaultProps {
    id: string;
    merchant: string;
    name: string;
    description: string;
    parents: string[];
    img: string;
    status: string;

    constructor(props: CategoryProps) {
        super();
        Object.assign(this, props);
    }

    static create(props: CategoryProps): Category {
        return new Category(props);
    }
}
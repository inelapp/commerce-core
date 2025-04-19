export interface GenericObject {
    [key: string]: any;
}

export interface GenericFilters {
    createdAt?: Date;
    updatedAt?: Date;
    page?: number;
    limit?: number;
    $ne?: GenericObject;
}

export interface GenericOptions {
    showSensibleData?: boolean;
    paginate?: boolean; 
}

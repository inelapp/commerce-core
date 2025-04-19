import {
    ClientSession,
    isValidObjectId,
    Model,
    PopulateOptions,
} from 'mongoose';
import { formatDate, isValidDateString } from './date';

export interface IPaginateData<Response> {
    data: Response[];
    page: number;
    limit: number;
    totalRecords: number;
    totalPages: number;
}
export interface PopulateOptionRequest {
    path?: string;
    populate?: string;
    select?: string;
}

async function getQueryToFilterData<Filters>(
    filters?: Filters,
): Promise<Record<string, any>> {
    const query: Record<string, any> = {};
    if (filters) {
        if ((filters as any).$ne && typeof (filters as any).$ne === 'object') {
            const neFilters = (filters as any).$ne;
            Object.keys(neFilters).forEach((key) => {
                const value = neFilters[key];
                if (value !== undefined && value !== null) {
                    query[key] = { $ne: value };
                    // remove $ne key from query
                    delete neFilters[key];
                }
            });
        }
        Object.keys(filters).forEach((key) => {
            const value = filters[key as keyof Filters];
            if (value !== undefined && value !== null) {
                if (typeof value === 'object' && !Array.isArray(value)) {
                    Object.keys(value).forEach((subKey) => {
                        const subValue = value[subKey];
                        if (subValue !== undefined && subValue !== null) {
                            const nestedKey = `${key}.${subKey}`;
                            if (
                                typeof subValue === 'string' &&
                                !isValidObjectId(subValue)
                            ) {
                                query[nestedKey] = {
                                    $regex: subValue,
                                    $options: 'i',
                                };
                            } else {
                                query[nestedKey] = subValue;
                            }
                        }
                    });
                } else if (isValidDateString(value)) {
                    // @ts-ignore
                    const fromDate = filters.fromDate;
                    // @ts-ignore
                    const toDate = filters.toDate;
                    query.createdAt = { $gte: fromDate, $lte: toDate };
                } else if (
                    typeof value === 'string' &&
                    key !== 'status' &&
                    !isValidObjectId(value)
                ) {
                    query[key] = { $regex: value, $options: 'i' };
                } else if (
                    isValidObjectId(value) &&
                    (key === 'id' || key === '_id')
                ) {
                    query._id = value;
                } else if (Array.isArray(value)) {
                    if (key === 'id' || key === '_id') {
                        query._id = {
                            $in: value
                                .map((v) =>
                                    isValidObjectId(v) ? v : undefined,
                                )
                                .filter(Boolean),
                        };
                    } else {
                        query[key] = {
                            $in: value
                                .map((v) =>
                                    isValidObjectId(v) ? v : undefined,
                                )
                                .filter(Boolean),
                        };
                    }
                } else {
                    query[key] = value;
                }
            }
        });
    }
    return query;
}

async function getPaginateAndFilteredData<Response, Filters>(
    page: number = 1,
    limit: number = 10,
    model: Model<any>,
    filters?: Filters,
    populateOptions?: Array<string | PopulateOptionRequest>,
): Promise<IPaginateData<Response>> {
    const query: Record<string, any> =
        await getQueryToFilterData<Filters>(filters);

    console.log('query pagination', query);
    const queryString = model.find(query);

    if (populateOptions && populateOptions.length > 0) {
        populateOptions.map((prop) =>
            queryString.populate(prop as PopulateOptions),
        );
    }

    const totalRecords = await model.countDocuments(query);
    const totalPages = Math.ceil(totalRecords / limit);
    const data = await queryString
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

    return {
        data,
        page,
        limit,
        totalRecords,
        totalPages,
    };
}

async function getDataByFilterWithoutPagination<Response, Filters>(
    model: Model<any>,
    filters?: Filters,
    populateOptions?: Array<string | PopulateOptionRequest>,
): Promise<Response[]> {
    const query: Record<string, any> =
        await getQueryToFilterData<Filters>(filters);
    console.log('query whitout pagination', query);

    const queryString = model.find(query);

    if (populateOptions && populateOptions.length > 0) {
        populateOptions.map((prop) =>
            queryString.populate(prop as PopulateOptions),
        );
    }

    const data = await queryString;

    return data;
}

async function getDataByFilters<Response, Filters>(
    model: Model<any>,
    filters?: Filters,
    populateOptions?: Array<string | PopulateOptionRequest>,
    session?: ClientSession,
): Promise<Response> {
    const query: Record<string, any> =
        await getQueryToFilterData<Filters>(filters);

    if (filters) {
        const orConditions: Record<string, any>[] = [];
        if (orConditions.length > 0) {
            query.$or = orConditions;
        }
    }
    console.log('query', JSON.stringify(query));

    const queryString = model.findOne(query, null, { session });

    if (populateOptions && populateOptions.length > 0) {
        populateOptions.map((prop) =>
            queryString.populate(prop as PopulateOptions),
        );
    }

    const response = await queryString;
    return response;
}

export {
    getPaginateAndFilteredData,
    getDataByFilters,
    getDataByFilterWithoutPagination,
};

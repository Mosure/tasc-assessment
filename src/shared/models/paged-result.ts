export interface PagedResult<T> {
    data: T[];
    offset: number;
    total: number;
}

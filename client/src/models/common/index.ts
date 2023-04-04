export interface PaginatedListResponse<T> {
   data: T[];
   paging: PaginationResponse;
}

export interface PaginationResponse {
   page: number;
   limit: number;
   total: number;
}

export interface ApiParams {
   filters?: FilterCondition[];
   sort?: SortCondition;
}

export interface DateRange {
   startDate: Date;
   endDate: Date;
}

export interface PaginatedListParams extends ApiParams {
   page: number;
   limit: number;
}

export enum Op {
   StartWith = 'begin',
   EndWith = 'end',
   Greater = 'gt',
   Less = 'lt',
   Equal = 'eq',
   GreaterEqual = 'gte',
   LessEqual = 'lte',
   NotEqual = 'ne',
   In = 'in',
   Like = 'like',
   Between = 'btw',
}

export interface FilterCondition {
   field: string;
   op: Op;
   val: string[];
}

export interface SortCondition {
   field: string;
   asc: boolean;
}

export type ID = string;

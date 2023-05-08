export interface PaginatedListResponse<T> {
   data: T[];
   paging: PaginationResponse;
}

export interface PaginationResponse {
   page: number;
   limit: number;
   total: number;
}

export interface FilteringParams {
   filters?: FilterCondition[];
   sorts?: SortCondition[];
}

export interface DateRange {
   startDate: Date;
   endDate: Date;
}

export interface PaginatedListParams extends FilteringParams {
   page: number;
   limit: number;
}

export interface ApiParams {
   page?: number;
   limit?: number;
   filters?: string; // JSON string (ex: [{"field": "field_1","op":"eq","val": 1},{"field": "field_2","op":"eq","val": 2}] )
   sorts?: string; // JSON string (ex: field_1:asc,field_2:desc)
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

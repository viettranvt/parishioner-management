export interface PaginatedListResponse<T> {
   data: T[];
   paging: PaginationResponse;
}

export interface PaginationResponse {
   page: number;
   limit: number;
   total: number;
}

export interface PaginatedListParams {
   page: number;
   limit: number;
}

export type ID = string;

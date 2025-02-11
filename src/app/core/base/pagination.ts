export interface Pagination {
  totalItems: number;
  totalPages: number;
  page: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface IQuery {
  page: number;
  limit: number;
  sortedBy: string;

  [key: string]: string | number;
}

export interface IPaginationResponse<T> {
  page: number;
  perPage: number;
  allItems: number;
  foundItems: number;
  data: T[];
}

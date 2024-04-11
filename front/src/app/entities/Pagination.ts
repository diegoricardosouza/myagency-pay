export interface IPaginateResponse<TData> {
  data: TData;
  meta: {
    total: number;
  }
}

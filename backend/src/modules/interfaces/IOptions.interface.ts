export interface IOption {
  dataSize: string;
  joinLookup: boolean;
  filter: boolean;
  filterDate: Date | null;
  order: boolean;
  orderType: 'ASC' | 'DESC';
  useIndexes: boolean;
}

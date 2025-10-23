export type Order = 'asc' | 'desc';


export interface SortItem {
  field: string;
  direction: 'asc' | 'desc';
}
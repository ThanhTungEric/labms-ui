export interface CategoryItem {
  id: number;
  code: string;
  name: string;
  basePath: string;
  description: string;
  status: string;
}
export interface MasterData {
    id: number;
    name: string,
    items: CategoryItem[],
    
}


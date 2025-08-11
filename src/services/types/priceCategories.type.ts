

export interface priceCategoriesItems {
  id: number;
  label: string;
  descripton: string;
  rank: number;
  from: number;
  to: number;
}

export interface priceCategories {
  data: priceCategoriesItems[];
  meta: {
    count: number;
  };
}

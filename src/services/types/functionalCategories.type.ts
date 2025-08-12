export interface functionalCategoryItems {
  id: number;
  label: string;
  descripton: string;
}

export interface functionalCategories {
  data: functionalCategoryItems[];
  meta: {
    count: number;
  };
}

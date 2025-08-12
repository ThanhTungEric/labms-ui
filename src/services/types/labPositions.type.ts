export interface labPositionItems {
  id: number;
  name: string;
  descripton: string;
}

export interface labPositions {
  data: labPositionItems[];
  meta: {
    count: number;
  };
}

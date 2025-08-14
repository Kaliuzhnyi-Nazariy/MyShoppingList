export interface ListItem {
  id?: number;
  nameOfGood: string;
  description: string;
  store: string;
}

export interface ListItemDB {
  id: number;
  good: string;
  description: string;
  store: string;
}

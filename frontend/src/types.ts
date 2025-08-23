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

export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
}

export interface AddUser extends IUser {
  confirmPassword: string;
}

export type LoginUser = Omit<AddUser, "name" | "confirmPassword">;

export interface ErrorMessage {
  response: { data: { message: string } };
}

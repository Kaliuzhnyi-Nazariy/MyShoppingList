export interface ListItem {
  nameOfGood: string;
  description?: string;
  store: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface AddUser extends IUser {
  confirmPassword: string;
}

export interface RequestUser extends Request {
  user: IUser;
}

interface IUser {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export interface IHostUser extends IUser {
}

export type Token = string;

export interface ISiteUser extends IUser {
  email: string;
  token: Token;
  favoriteCount: number;
}

export type AuthData = {
  login: string;
  password: string;
};

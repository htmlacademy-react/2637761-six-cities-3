export interface IUser {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type Token = string;

export interface ISiteUser extends IUser {
  email: string;
  token: Token;
}

export type AuthData = {
  login: string;
  password: string;
};

export const ValidateUser = (user: ISiteUser): boolean => {
  const emailError = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email);

  let urlError = false;
  if (!user.avatarUrl) {
    urlError = true;
  } else {
    try {
      new URL(user.avatarUrl);
    } catch {
      urlError = true;
    }
  }

  if (emailError || urlError) {
    return false;
  }

  return true;
};

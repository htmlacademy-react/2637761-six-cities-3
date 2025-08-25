import { Token } from '../types/user';

const AUTH_TOKEN_KEY_NAME = 'six-cities-token';

export const getToken = (): Token => localStorage.getItem(AUTH_TOKEN_KEY_NAME) ?? 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20=';
export const saveToken = (token: Token): void => localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
export const dropToken = (): void => localStorage.removeItem(AUTH_TOKEN_KEY_NAME);

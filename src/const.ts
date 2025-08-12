export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum AppRoute {
  Login = '/login',
  Offer = '/offer/:id',
  Favorites = '/favorites',
  Main = '/',
}

export const SortTypes = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'] as const;
export type SortType = typeof SortTypes[number];

export const isSortType = (str: string): str is SortType => (SortTypes as readonly string[]).includes(str);



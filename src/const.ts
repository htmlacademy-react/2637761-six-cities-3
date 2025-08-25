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

export const APIRoute = Object.freeze({
  Offers: '/offers',
  Favorite: '/favorite',
  Comments: '/comments',
  Login: '/login',
  Logout: '/logout'
} as const);

export const SORT_TYPES = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'] as const;
export type SortType = typeof SORT_TYPES[number];

export const isSortType = (str: string): str is SortType => (SORT_TYPES as readonly string[]).includes(str);



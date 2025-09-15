import { SortType } from '../const';

export interface AppConfig {
  api: {
    baseUrl: string;
    timeout: number;
  };
  defaultCity: string;
  defaultSortType: SortType;
}

export const CONFIG: AppConfig = {
  api: {
    baseUrl: 'https://15.design.htmlacademy.pro/six-cities',
    timeout: 5000
  },
  defaultCity: 'Paris',
  defaultSortType: 'Popular'
};

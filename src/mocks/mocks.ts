import { AuthorizationStatus } from '../const';
import { MainPageProps } from '../pages/MainPage/MainPage';

export const DefaultData: MainPageProps = {
  mainPageData: {
    selectedCity: 'Amsterdam'
  }
};

export const getAuthStatus = () => AuthorizationStatus.Auth;

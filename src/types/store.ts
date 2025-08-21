import {store} from '../store/index.ts';
import {AuthorizationStatus, SortType} from '../const';
import { IPlace } from './place.ts';
import { City } from './city.ts';
import { OfferView } from './place';

export type OffersState = {
  cities: City[];
  city: City;
  allPlaces: IPlace[];
  cityPlaces: IPlace[];
  cityPlacesCount: number;
  sortType: SortType;
  offerView: OfferView;
  favorites: IPlace[];
  dataLoading: boolean;
  hasError: boolean;
};

export type UserState = {
  authStatus: AuthorizationStatus;
  dataLoading: boolean;
  hasError: boolean;
};


export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

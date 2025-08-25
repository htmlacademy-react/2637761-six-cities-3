import { City } from './city';
import { IPlace } from './place';
import { IUser } from './user';

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface IReview {
  id: string;
  date: string;
  user: IUser;
  comment: string;
  rating: number;
}

export type MapProps = {
  viewType: MapViewType;
  city: City;
  places: IPlace[];
  selectedPlace: string;
}

export enum MapViewType {
  Offer = 'offer',
  Cities = 'cities',
}

export enum SliceSpace {
  Offers = 'Offers',
  User = 'User'
}

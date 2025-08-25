import { City } from './city';
import { IReview, Location } from './types';
import { IUser } from './user';

export interface IPlace {
  id: string;
  title: string;
  type: 'apartment' | 'room' | 'house' | 'hotel';
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage?: string;
}

export interface IOffer extends IPlace {
  description: string;
  bedrooms: number;
  goods: string[];
  host: IUser;
  images: string[];
  maxAdults: number;
}

export type OfferView = {
  offer: IOffer | undefined;
  nearPlaces: IPlace[];
  reviews: IReview[];
}

export type PlaceCardProps = {
  viewType: PlaceViewType;
  place: IPlace;
  onHover?: (place?: IPlace) => void;
}

export enum PlaceViewType {
  Favorite = 'favorites',
  Cities = 'cities',
  NearPlaces = 'near-places',
}

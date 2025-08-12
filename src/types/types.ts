export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type City = {
  id?: number;
  name: string;
  location: Location;
}

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
  host: IHostUser;
  images: string[];
  maxAdults: number;
}

export interface IReview {
  id: string;
  date: string;
  user: IHostUser;
  comment: string;
  rating: number;
}

interface IUser {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export interface IHostUser extends IUser {
}

export interface ISiteUser extends IUser {

  email: string;
  favoriteCount: number;
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

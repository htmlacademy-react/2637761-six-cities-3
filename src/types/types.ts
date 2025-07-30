export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type City = {
  cityId: number;
  cityName: string;
}

export interface IPlace {
  id: number;
  cityId: number;
  isPremium: boolean;
  previewImage: string;
  price: number;
  type: 'Apartment' | 'Room' | 'House' | 'Hotel';
  title: string;
  location?: Location;
  isFavorite: boolean;
  rating: number;
}

export type UserData = {
  favoriteCount: number;
  userEmail: string;
}

export type PlaceCardProps = {
  viewType: PlaceViewType;
  place: IPlace;
}

export enum PlaceViewType {
  Favorite = 'favorites',
  Cities = 'cities',
  NearPlaces = 'near-places',
}

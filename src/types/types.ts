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
  type: 'Apartment' | 'Room';
  title: string;
  location?: Location;
}

export interface IOffer extends IPlace {
  isFavorite: boolean;
  rating: number;
}

export type UserData = {
  favoriteCount: number;
  userEmail: string;
}

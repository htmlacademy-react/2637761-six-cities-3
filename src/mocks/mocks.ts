import { MainPageProps } from '../pages/MainPage/MainPage';
import {IPlace} from '../types/types';

export const DefaultData: MainPageProps = {
  selectedCityId: 4
};

export const placeData: IPlace[] = [
  {
    id: 1,
    cityId: 4,
    isPremium: true,
    previewImage: 'img/apartment-01.jpg',
    price: 120,
    isFavorite: false,
    rating: 4,
    title: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment'
  },
  {
    id: 2,
    cityId: 4,
    isPremium: false,
    previewImage: 'img/room.jpg',
    price: 80,
    isFavorite: true,
    rating: 4,
    title: 'Wood and stone place',
    type: 'Room'
  },
  {
    id: 3,
    cityId: 4,
    isPremium: false,
    previewImage: 'img/apartment-02.jpg',
    price: 132,
    isFavorite: false,
    rating: 4,
    title: 'Canal View Prinsengracht',
    type: 'Apartment'
  },
  {
    id: 4,
    cityId: 4,
    isPremium: true,
    previewImage: 'img/apartment-03.jpg',
    price: 180,
    isFavorite: false,
    rating: 5,
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment'
  },
  {
    id: 5,
    cityId: 4,
    isPremium: false,
    previewImage: 'img/room.jpg',
    price: 80,
    isFavorite: true,
    rating: 4,
    title: 'Wood and stone place',
    type: 'Room'
  }
];

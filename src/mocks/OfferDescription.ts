import {IOffer} from '../types/types';

const Offer: IOffer = {
  id: 'aaa74385-bb48-4454-b3e9-e64badf2c433',
  title: 'Beautiful & luxurious apartment at great location',
  type: 'house',
  price: 930,
  city: {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13
    }
  },
  location: {
    latitude: 52.36554,
    longitude: 4.911976,
    zoom: 16
  },
  isFavorite: false,
  isPremium: false,
  rating: 2.5,
  description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  bedrooms: 3,
  goods: [
    'Fridge',
    'Laptop friendly workspace',
    'Air conditionin'
  ],
  host: {
    name: 'Angelina',
    avatarUrl: 'https://15.design.htmlacademy.pro/static/host/avatar-angelina.jpg',
    isPro: true
  },
  images: [
    'https://15.design.htmlacademy.pro/static/hotel/6.jpg',
    'https://15.design.htmlacademy.pro/static/hotel/16.jpg',
    'https://15.design.htmlacademy.pro/static/hotel/20.jpg',
    'https://15.design.htmlacademy.pro/static/hotel/4.jpg',
    'https://15.design.htmlacademy.pro/static/hotel/12.jpg',
    'https://15.design.htmlacademy.pro/static/hotel/11.jpg'
  ],
  maxAdults: 4
};


export const getOfferDescription = (offerId: string): IOffer | undefined => {
  if (!offerId){
    return undefined;
  }

  return {...Offer};
};

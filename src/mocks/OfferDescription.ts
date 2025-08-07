import {IOffer} from '../types/types';
import {getPlaceById} from '../mocks/Offers';

const Offer = {
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

  const place = getPlaceById(offerId);

  return {...place, ...Offer} as IOffer;
};

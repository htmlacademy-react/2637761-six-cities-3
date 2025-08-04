import { IReview } from '../types/types';

const Reviews: IReview[] = [
  {
    id: 'f52e2e7f-563b-4f5b-a51a-59fd48202f34',
    comment: 'The room was spacious and clean. The pool looked nothing like the photos and desparately needs a clean. The sauna and spa were closed for lunar new year holiday.',
    date: '2025-07-07T21:00:01.149Z',
    rating: 2,
    user: {
      name: 'Kendall',
      avatarUrl: 'https://15.design.htmlacademy.pro/static/avatar/4.jpg',
      isPro: true
    }
  },
  {
    id: '836e4019-c094-459c-9dbf-e9225b2ea0f4',
    comment: 'We loved it so much, the house, the veiw, the location just great.. Highly reccomend :)',
    date: '2025-07-07T21:00:01.149Z',
    rating: 1,
    user: {
      name: 'Max',
      avatarUrl: 'https://15.design.htmlacademy.pro/static/avatar/1.jpg',
      isPro: false
    }
  },
  {
    id: 'bad450da-b972-429d-ad6f-db15f78455be',
    comment: 'Beautiful space, fantastic location and atmosphere, really a wonderful place to spend a few days. Will be back.',
    date: '2025-07-04T21:00:01.149Z',
    rating: 2,
    user: {
      name: 'Zak',
      avatarUrl: 'https://15.design.htmlacademy.pro/static/avatar/7.jpg',
      isPro: true
    }
  }
];

export const getOfferReviews = (offerId: string): IReview[] => {
  if (!offerId){
    return [];
  }

  return [...Reviews];
};

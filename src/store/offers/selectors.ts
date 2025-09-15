import { State } from '../../types/store';
import { SortType } from '../../const';
import { City } from '../../types/city';
import { IPlace } from '../../types/place';
import { IReview, SliceSpace } from '../../types/types';
import { createSelector } from '@reduxjs/toolkit';

const selectOffersState = (state: State) => state[SliceSpace.Offers];
const selectOfferView = (state: State) => state[SliceSpace.Offers].offerView;

const getDataIsLoading = createSelector(
  selectOffersState,
  (offersState): boolean => offersState.dataLoading
);

export const getAllCities = createSelector(
  selectOffersState,
  (offersState): City[] => offersState.cities
);

const getCity = createSelector(
  selectOffersState,
  (offersState): City => offersState.city
);

export const citiesSelector = createSelector(
  [getCity, getAllCities],
  (city, cities) => ({ city, cities })
);


const getCityPlaces = createSelector(
  selectOffersState,
  (offersState): IPlace[] => offersState.cityPlaces
);

export const getCityPlacesCount = createSelector(
  getCityPlaces,
  (cityPlaces): number => cityPlaces.length
);

export const cityPlacesSelector = createSelector(
  [getDataIsLoading, getCity, getCityPlaces, getCityPlacesCount],
  (dataIsLoading, city, unsortedPlaces, cityPlacesCount) => ({ dataIsLoading, city, unsortedPlaces, cityPlacesCount })
);


export const getActivePlaceId = createSelector(
  selectOffersState,
  (offersState): string => offersState.activePlaceId
);

export const getSortType = createSelector(
  selectOffersState,
  (offersState): SortType => offersState.sortType
);


export const offerPageSelector = createSelector(
  selectOffersState,
  (offersState) => ({ currentOffer: offersState.offerView.offer, nearPlaces: offersState.offerView.nearPlaces.slice(0, 3) })
);

export const getOfferId = createSelector(
  selectOfferView,
  (offerView): string | undefined => offerView.offer?.id
);

export const getOfferReviews = createSelector(
  selectOfferView,
  (offerView): IReview[] => offerView.reviews.slice(0, 10)
);

export const getAddReviewHasError = createSelector(
  selectOffersState,
  (offersState): boolean => offersState.addReviewError
);


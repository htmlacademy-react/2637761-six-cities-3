import {State} from '../../types/store';
import {SortType} from '../../const';
import { City } from '../../types/city';
import { IPlace, OfferView } from '../../types/place';
import { SliceSpace } from '../../types/types';

const getDataIsLoading = (state: State): boolean => state[SliceSpace.Offers].dataLoading;
const getAllCities = (state: State): City[] => state[SliceSpace.Offers].cities;
const getCity = (state: State): City => state[SliceSpace.Offers].city;
const getCityPlaces = (state: State): IPlace[] => state[SliceSpace.Offers].cityPlaces;
const getCityPlacesCount = (state: State): number => state[SliceSpace.Offers].cityPlacesCount;
const getSortType = (state: State): SortType => state[SliceSpace.Offers].sortType;

const getOffer = (state: State): OfferView => state[SliceSpace.Offers].offerView;
const getFavorites = (state: State): IPlace[] => state[SliceSpace.Offers].favorites;

export { getDataIsLoading, getAllCities, getCity, getCityPlaces, getCityPlacesCount, getSortType, getOffer, getFavorites };

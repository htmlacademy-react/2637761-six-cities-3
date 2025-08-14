import {State} from '../types/store';

const selectAuthStatus = (state: State) => state.authStatus;
const selectCities = (state: State) => state.cities;
const selectCity = (state: State) => state.city;
const selectCityPlaces = (state: State) => state.cityPlaces;
const selectCityPlacesCount = (state: State) => state.cityPlacesCount;
const selectSortType = (state: State) => state.sortType;

export { selectAuthStatus, selectCities, selectCity, selectCityPlaces, selectCityPlacesCount, selectSortType };

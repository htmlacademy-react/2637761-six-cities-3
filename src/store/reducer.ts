import { createReducer } from '@reduxjs/toolkit';
import { setCity } from '../store/actions';

import { AuthorizationStatus } from '../const';
import {City, IPlace} from '../types/types';
import {cityData, getCityByName, getDefaultCity} from '../store/CityData/CityData';

import {getPlaces} from '../mocks/Offers';

type AppState = {
    authStatus: AuthorizationStatus;
    cities: City[];
    city: City;
    cityPlaces: IPlace[];
    cityPlacesCount: number;
}

const getCity = (cityName: string) => getCityByName(cityName) ?? getDefaultCity();

const defaultCityName = 'Amsterdam';
const defaultCity = getCity(defaultCityName);
const defaultCityPlaces = getPlaces(defaultCity.name);
const defaultCityPlacesCount = defaultCityPlaces.length;


const initialState: AppState = {
  authStatus: AuthorizationStatus.Auth,
  cities: cityData,
  city: defaultCity,
  cityPlaces: defaultCityPlaces,
  cityPlacesCount: defaultCityPlacesCount
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = getCity(action.payload);
      state.cityPlaces = getPlaces(state.city.name);
      state.cityPlacesCount = state.cityPlaces.length;
    });
});

export { reducer };

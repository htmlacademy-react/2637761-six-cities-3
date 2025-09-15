import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OffersState } from '../../types/store';
import { fetchOffersAction, fetchOfferViewAction, fetchFavoritesAction, fetchCommentsAction, addCommentAction } from '../../store/apiActions';
import { cityData, getCityByName, getDefaultCity } from '../../store/CityData/CityData';
import { SliceSpace } from '../../types/types';
import { SortType } from '../../const';
import { CONFIG } from '../../config/appConfig';

const getCity = (cityName: string) => getCityByName(cityName) ?? getDefaultCity();

const initialState: OffersState = {
  cities: cityData,
  city: getCity(CONFIG.defaultCity),
  allPlaces: [],
  cityPlaces: [],
  cityPlacesCount: 0,
  activePlaceId: '',
  sortType: CONFIG.defaultSortType,
  offerView: {
    offer: undefined,
    nearPlaces: [],
    reviews: [],
  },
  favorites: [],
  dataLoading: false,
  hasError: false,
  addReviewError: false
};

export const offers = createSlice({
  name: SliceSpace.Offers,
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.city = getCity(action.payload);
      state.cityPlaces = [...state.allPlaces.filter((r) => r.city.name === state.city.name)];
      state.cityPlacesCount = state.cityPlaces.length;
    },
    setSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    },
    setActivePlaceId: (state, action: PayloadAction<string | undefined>) => {
      state.activePlaceId = action.payload ?? 'unknown';
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.dataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.allPlaces = action.payload;
        state.cityPlaces = [...state.allPlaces.filter((r) => r.city.name === state.city.name)];
        state.cityPlacesCount = state.cityPlaces.length;
        state.dataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.dataLoading = false;
        state.hasError = true;
      })
      .addCase(fetchOfferViewAction.pending, (state) => {
        state.dataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOfferViewAction.fulfilled, (state, action) => {
        state.offerView = action.payload;
        state.dataLoading = false;
      })
      .addCase(fetchOfferViewAction.rejected, (state) => {
        state.dataLoading = false;
        state.hasError = true;
      })
      .addCase(fetchCommentsAction.pending, (state) => {
        state.hasError = false;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.offerView.reviews = action.payload.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      })
      .addCase(fetchCommentsAction.rejected, (state) => {
        state.hasError = true;
      })
      .addCase(addCommentAction.fulfilled, (state) => {
        state.addReviewError = false;
      })
      .addCase(addCommentAction.rejected, (state) => {
        state.addReviewError = true;
      })
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.dataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.dataLoading = false;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.dataLoading = false;
        state.hasError = true;
      });
  }
});

export const {setCity, setSortType, setActivePlaceId} = offers.actions;

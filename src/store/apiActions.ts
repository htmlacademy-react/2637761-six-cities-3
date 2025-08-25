import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/store';
import {redirectToRoute} from './actions';
import {saveToken, dropToken} from '../services/token';
import {APIRoute, AppRoute} from '../const';
import { IOffer, IPlace, OfferView } from '../types/place';
import { AuthData, ISiteUser } from '../types/user';
import { IReview } from '../types/types';

export const fetchOffersAction = createAsyncThunk<IPlace[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<IPlace[]>(APIRoute.Offers);
    return data;
  },
);

export const fetchOfferViewAction = createAsyncThunk<OfferView, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchOfferById',
  async (id, { extra: api }) => {
    const [{data: offer}, {data: nearby}, {data: reviews}] = await Promise.all([
      api.get<IOffer>(`${APIRoute.Offers}/${id}`),
      api.get<IPlace[]>(`${APIRoute.Offers}/${id}/nearby`),
      api.get<IReview[]>(`${APIRoute.Comments}/${id}`)
    ]);

    const result: OfferView = {
      offer: offer,
      nearPlaces: nearby,
      reviews: reviews
    };

    return result;
  },
);

export const fetchFavoritesAction = createAsyncThunk<IPlace[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchFavorites',
  async (_arg, {extra: api}) => {
    const { data } = await api.get<IPlace[]>(`${APIRoute.Favorite}`);
    return data;
  },
);


export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'checkAuth',
  async (_arg, {extra: api}) => {
    await api.get(APIRoute.Login);
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<ISiteUser>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'logout',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);

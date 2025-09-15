import { redirectToRoute } from './actions';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AppRoute } from '../const';
import { IOffer, IPlace, OfferView } from '../types/place';
import { AuthData, ISiteUser, ValidateUser } from '../types/user';
import { ChangeFavoriteData, ChangeFavoriteResult, CommentData, IReview } from '../types/types';
import { createAppAsyncThunk } from '../hooks';

export const fetchOffersAction = createAppAsyncThunk<IPlace[], undefined>(
  'fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<IPlace[]>(APIRoute.Offers);
    return data;
  }
);

export const fetchOfferViewAction = createAppAsyncThunk<OfferView, string>(
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
  }
);

export const fetchFavoritesAction = createAppAsyncThunk<IPlace[], undefined>(
  'fetchFavorites',
  async (_arg, {extra: api}) => {
    const { data } = await api.get<IPlace[]>(`${APIRoute.Favorite}`);
    return data;
  }
);

export const changeFavoriteAction = createAppAsyncThunk<ChangeFavoriteResult, ChangeFavoriteData>(
  'changeFavorite',
  async ({ placeId, status }, {extra: api}) => {
    const { data } = await api.post<IPlace>(`${APIRoute.Favorite}/${placeId}/${status}`);
    return {
      place: data,
      status: status
    };
  }
);

export const fetchCommentsAction = createAppAsyncThunk<IReview[], string>(
  'fetchComments',
  async (id, { extra: api }) => {
    const { data } = await api.get<IReview[]>(`${APIRoute.Comments}/${id}`);
    return data;
  }
);

export const addCommentAction = createAppAsyncThunk<void, CommentData>(
  'addComment',
  async ({ comment, placeId: id }, { dispatch, extra: api }) => {
    await api.post(`${APIRoute.Comments}sss/sss${id}`, comment);
    dispatch(fetchCommentsAction(id));
  }
);

export const checkAuthAction = createAppAsyncThunk<ISiteUser, undefined>(
  'checkAuth',
  async (_arg, {dispatch, extra: api }) => {
    const { data } = await api.get<ISiteUser>(APIRoute.Login);
    dispatch(fetchFavoritesAction());

    return data;
  }
);

export const loginAction = createAppAsyncThunk<ISiteUser, AuthData>(
  'login',
  async ({login: email, password}, { dispatch, extra: api }) => {
    const { data } = await api.post<ISiteUser>(APIRoute.Login, {email, password});

    const isValidUser = ValidateUser(data);
    if (!isValidUser){
      throw new Error('Ошибка при получении пользователя');
    }

    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Main));
    dispatch(fetchFavoritesAction());

    return data;
  }
);

export const logoutAction = createAppAsyncThunk<void, undefined>(
  'logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(checkAuthAction());
  }
);


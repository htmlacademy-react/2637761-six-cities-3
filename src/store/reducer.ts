import {combineReducers} from '@reduxjs/toolkit';
import {SliceSpace} from '../types/types';
import {offers} from './offers/offers';
import {user} from './user/user';

export const rootReducer = combineReducers({
  [SliceSpace.Offers]: offers.reducer,
  [SliceSpace.User]: user.reducer
});

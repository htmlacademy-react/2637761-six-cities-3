import {createSlice} from '@reduxjs/toolkit';
import {UserState} from '../../types/store';
import {checkAuthAction, loginAction, logoutAction} from '../../store/apiActions';
import {SliceSpace} from '../../types/types';
import {AuthorizationStatus} from '../../const';

const initialState: UserState = {
  authStatus: AuthorizationStatus.Auth,
  dataLoading: false,
  hasError: false
};

export const user = createSlice({
  name: SliceSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
      });
  }
});

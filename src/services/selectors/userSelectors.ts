import { RootState } from '../store';

export const selectUser = (state: RootState) => state.userReducer.user;
export const selectUserIsLoading = (state: RootState) =>
  state.userReducer.isUserLoading;
export const selectUserIsInit = (state: RootState) => state.userReducer.isInit;
export const selectUserIsAuth = (state: RootState) => state.userReducer.isAuth;
export const selectUserError = (state: RootState) => state.userReducer.error;

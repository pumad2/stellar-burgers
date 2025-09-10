import { RootState } from '../store';

export const selectConstructorItems = (state: RootState) =>
  state.constructorReducer.constructorItems;
export const selectConstructorIsLoading = (state: RootState) =>
  state.constructorReducer.isLoading;
export const selectConstructorError = (state: RootState) =>
  state.constructorReducer.error;
export const selectConstructorState = (state: RootState) =>
  state.constructorReducer;

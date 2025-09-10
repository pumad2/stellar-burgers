import { RootState } from '../store';

export const selectOrders = (state: RootState) => state.orderReducer.orders;
export const selectOrderModalData = (state: RootState) =>
  state.orderReducer.orderModalData;
export const selectOrdersIsLoading = (state: RootState) =>
  state.orderReducer.isLoading;
export const selectOrdersIsInit = (state: RootState) =>
  state.orderReducer.isInit;
export const selectOrdersError = (state: RootState) => state.orderReducer.error;
export const selectOrderRequest = (state: RootState) =>
  state.orderReducer.orderRequest;

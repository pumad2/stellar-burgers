import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectFeedsOrders = (state: RootState) =>
  state.feedsReducer.orders;
export const selectFeedsTotal = (state: RootState) => state.feedsReducer.total;
export const selectFeedsTotalToday = (state: RootState) =>
  state.feedsReducer.totalToday;
export const selectFeedsIsLoading = (state: RootState) =>
  state.feedsReducer.isLoading;
export const selectFeedsIsInit = (state: RootState) =>
  state.feedsReducer.isInit;
export const selectFeedsError = (state: RootState) => state.feedsReducer.error;
export const selectFeedsOrdersParams = createSelector(
  [selectFeedsTotal, selectFeedsTotalToday],
  (total, totalToday) => ({ total, totalToday })
);

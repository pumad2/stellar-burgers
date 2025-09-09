import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFeedsApi, getOrderByNumberApi } from "@api";
import { TOrder } from "@utils-types";

export const getFeedsThunk = createAsyncThunk(
    'feed/getFeeds',
    async () => {
        const res = await getFeedsApi();
        return res;
    }
)

interface feedsState {
    orders: TOrder[];
    total: number;
    totalToday: number;
    isLoading: boolean;
    isInit: boolean;
    error: string | null;
}

const initialState: feedsState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isLoading: false,
    isInit: false,
    error: null
}

export const feedsSlice = createSlice({
    name: 'feeds',
    initialState,
    reducers: {
        init: (state) => {
            state.isInit = true;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getFeedsThunk.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getFeedsThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.isInit = true;
            state.error = action.error.message || 'Ошибка загрузки';
        });
        builder.addCase(getFeedsThunk.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.isInit = true;
            state.orders = payload.orders;
            state.total = payload.total;
            state.totalToday = payload.totalToday;
        });
    }
});

export const {init} = feedsSlice.actions;

export default feedsSlice.reducer
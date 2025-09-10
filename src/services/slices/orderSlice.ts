import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi, orderBurgerApi, getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

export const getOrdersThunk = createAsyncThunk('orders/getOrders', async () => {
  const res = await getOrdersApi();
  return res;
});

export const orderBurgerThunk = createAsyncThunk(
  'order/orderBurger',
  async (data: string[]) => {
    const res = await orderBurgerApi(data);
    return res;
  }
);

export const getOrderByNumberThunk = createAsyncThunk(
  'order/getOrderByNumber',
  async (number: number) => {
    const res = await getOrderByNumberApi(number);
    return res;
  }
);

interface orderState {
  orders: TOrder[];
  orderModalData: TOrder | null;
  orderRequest: boolean;
  isLoading: boolean;
  isInit: boolean;
  error: string | null;
}

const initialState: orderState = {
  orders: [],
  orderModalData: null,
  orderRequest: false,
  isLoading: false,
  isInit: false,
  error: null
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    init: (state) => {
      state.isInit = true;
    },
    setOrders: (state, { payload }) => {
      state.orders = payload;
    },
    resetModal: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getOrdersThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOrdersThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isInit = true;
      state.error = action.error.message || 'Ошибка загрузки заказов';
    });
    builder.addCase(getOrdersThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isInit = true;
      state.orders = payload;
    });

    builder.addCase(orderBurgerThunk.pending, (state) => {
      state.orderRequest = true;
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(orderBurgerThunk.rejected, (state, action) => {
      state.orderRequest = false;
      state.isLoading = false;
      state.error = action.error.message || 'Ошибка создания заказа';
    });
    builder.addCase(orderBurgerThunk.fulfilled, (state, action) => {
      state.orderRequest = false;
      state.isLoading = false;
      state.orderModalData = action.payload.order;
    });

    builder.addCase(getOrderByNumberThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOrderByNumberThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Ошибка загрузки';
    });
    builder.addCase(getOrderByNumberThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.orderModalData = payload.orders[0];
    });
  }
});

export const { init, resetModal, setOrders } = ordersSlice.actions;

export default ordersSlice.reducer;

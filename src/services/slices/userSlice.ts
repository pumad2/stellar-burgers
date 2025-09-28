import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { setCookie, deleteCookie } from '../../utils/cookie';
import { orderBurgerThunk } from './orderSlice';

export const registerUserThunk = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const res = await registerUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const loginUserThunk = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const res = await loginUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const getUserThunk = createAsyncThunk('user/getUser', async () => {
  const res = await getUserApi();
  return res.user;
});

export const updateUserThunk = createAsyncThunk(
  'user/updateUser',
  async (user: Partial<TRegisterData>) => {
    const res = await updateUserApi(user);
    return res.user;
  }
);

export const logoutThunk = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

interface userState {
  user: TUser | null;
  isUserLoading: boolean;
  isInit: boolean;
  isAuth: boolean;
  error: string | null;
}

export const initialState: userState = {
  user: null,
  isUserLoading: false,
  isInit: false,
  isAuth: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    init: (state) => {
      state.isInit = true;
    },
    logout: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerUserThunk.pending, (state) => {
      state.isUserLoading = true;
      state.error = null;
    });
    builder.addCase(registerUserThunk.rejected, (state, action) => {
      state.isUserLoading = false;
      state.isInit = true;
      state.error = action.error.message || 'Ошибка регистрации';
    });
    builder.addCase(registerUserThunk.fulfilled, (state, { payload }) => {
      state.isUserLoading = false;
      state.isInit = true;
      state.user = payload;
      state.isAuth = true;
    });

    builder.addCase(loginUserThunk.pending, (state) => {
      state.isUserLoading = true;
      state.error = null;
    });
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      state.isUserLoading = false;
      state.isInit = true;
      state.error = action.error.message || 'Ошибка аутентификации';
    });
    builder.addCase(loginUserThunk.fulfilled, (state, { payload }) => {
      state.isUserLoading = false;
      state.isInit = true;
      state.user = payload;
      state.isAuth = true;
    });

    builder.addCase(getUserThunk.pending, (state) => {
      state.isUserLoading = true;
      state.error = null;
    });
    builder.addCase(getUserThunk.rejected, (state, action) => {
      state.isUserLoading = false;
      state.isInit = true;
      state.error = action.error.message || 'Ошибка загрузки';
    });
    builder.addCase(getUserThunk.fulfilled, (state, { payload }) => {
      state.isUserLoading = false;
      state.isInit = true;
      state.user = payload;
      state.isAuth = true;
    });

    builder.addCase(updateUserThunk.pending, (state) => {
      state.isUserLoading = true;
      state.error = null;
    });
    builder.addCase(updateUserThunk.rejected, (state, action) => {
      state.isUserLoading = false;
      state.error = action.error.message || 'Ошибка обновления данных';
    });
    builder.addCase(updateUserThunk.fulfilled, (state, { payload }) => {
      state.isUserLoading = false;
      state.user = payload;
    });

    builder.addCase(logoutThunk.pending, (state) => {
      state.isUserLoading = true;
      state.error = null;
    });
    builder.addCase(logoutThunk.rejected, (state, action) => {
      state.isUserLoading = false;
      state.error = action.error.message || 'Ошибка выхода из аккаунта';
    });
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.isUserLoading = false;
      state.user = null;
      state.isAuth = false;
    });
  }
});

export const { init, logout } = userSlice.actions;

export default userSlice.reducer;

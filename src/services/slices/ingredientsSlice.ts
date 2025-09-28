import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

export const getIngredientsThunk = createAsyncThunk(
  'ingredients/getIngredients',
  async () => {
    const res = await getIngredientsApi();
    return res;
  }
);

interface ingredientsState {
  ingredients: TIngredient[];
  isLoading: boolean;
  isInit: boolean;
  error: string | null;
}

export const initialState: ingredientsState = {
  ingredients: [],
  isLoading: false,
  isInit: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    init: (state) => {
      state.isInit = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getIngredientsThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getIngredientsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isInit = true;
      state.error = action.error.message || 'Ошибка загрузки ингредиентов';
    });
    builder.addCase(getIngredientsThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isInit = true;
      state.ingredients = payload;
    });
  }
});

export const { init } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;

import { RootState } from "../store";

export const selectIngredients = (state: RootState) => state.ingredientsReducer.ingredients;
export const selectIngredientsIsLoading = (state: RootState) => state.ingredientsReducer.isLoading;
export const selectIngredientsIsInit = (state: RootState) => state.ingredientsReducer.isInit;
export const selectIngredientsError = (state: RootState) => state.ingredientsReducer.error;

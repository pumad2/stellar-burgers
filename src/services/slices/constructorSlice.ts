import { orderBurgerApi } from "@api";
import { createAsyncThunk, createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { TConstructorIngredient, TIngredient, TOrder } from "@utils-types";
import { RootState } from "../store";

export interface constructorState {
    constructorItems: {
        bun: TIngredient | null;
        ingredients: TConstructorIngredient[];
    };
    isLoading: boolean;
    error: string | null;
}

export const initialState: constructorState = {
    constructorItems: {
        bun: null,
        ingredients: []
    },
    isLoading: false,
    error: null
}

export const constructorSlice = createSlice({
    name: 'constructor',
    initialState,
    reducers: {
        addIngredient: {
            reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
                if (payload.type === 'bun') {
                    state.constructorItems.bun = payload;
                } else {
                    state.constructorItems.ingredients.push(payload);
                }
            },
            prepare: (ingredient: TIngredient) => ({
                payload: { ...ingredient, id: nanoid() }
            })
        },
        removeIngredient: (state, { payload }: PayloadAction<string>) => {
            state.constructorItems.ingredients = state.constructorItems.ingredients.filter(i => i.id !== payload);
        },
        moveIngredient: (state, { payload }: PayloadAction<{ fromIndex: number; toIndex: number }>) => {
            const arr = state.constructorItems.ingredients;
            const [moved] = arr.splice(payload.fromIndex, 1);
            arr.splice(payload.toIndex, 0, moved);
        },
        resetConstructor: (state) => {
            state.constructorItems = { bun: null, ingredients: [] };
        }
    }
});

export const { addIngredient, removeIngredient, moveIngredient, resetConstructor } = constructorSlice.actions;
export default constructorSlice.reducer;
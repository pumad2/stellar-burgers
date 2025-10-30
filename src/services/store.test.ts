import { rootReducer } from "./store";
import { describe, expect, test } from '@jest/globals';
import { initialState as userState } from "./slices/userSlice";
import { initialState as orderState } from "./slices/orderSlice";
import { initialState as ingredientsState } from "./slices/ingredientsSlice";
import { initialState as feedsState } from "./slices/feedsSlice";
import { initialState as constructorState } from "./slices/constructorSlice";

describe('Стор', () => {
    test('Инициализация rootReducer', () => {
        const state = rootReducer(undefined, { type: '' });
        expect(state).toEqual({
            userReducer: userState,
            orderReducer: orderState,
            ingredientsReducer: ingredientsState,
            feedsReducer: feedsState,
            constructorReducer: constructorState
        });
    });
});
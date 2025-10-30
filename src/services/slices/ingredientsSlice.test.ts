import reducer, { getIngredientsThunk, initialState } from './ingredientsSlice';
import { TIngredient } from '../../utils/types';
import { describe, expect, test } from '@jest/globals';

describe('Слайс ингредиентов', () => {
    const data: TIngredient[] = [
        {
            "_id": "bun1",
            "name": "Булка 1",
            "type": "bun",
            "proteins": 0,
            "fat": 0,
            "carbohydrates": 0,
            "calories": 0,
            "price": 10,
            "image": "bun.png",
            "image_large": "bun.png",
            "image_mobile": "bun.png"
        }
    ];

    test('pending - isLoading: true', () => {
        const state = reducer(initialState, getIngredientsThunk.pending(''));
        expect(state.isLoading).toBe(true);
    });

    test('fulfilled - isLoading: false, данные записаны в стор', () => {
        const state = reducer(initialState, getIngredientsThunk.fulfilled(data, ''));
        expect(state.isLoading).toBe(false);
        expect(state.ingredients).toEqual(data);
    });

    test('rejected - isLoading: false, ошибка записывается в стор', () => {
        const state = reducer(initialState, getIngredientsThunk.rejected(new Error('Ошибка'), ''));
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe('Ошибка');
    });
});
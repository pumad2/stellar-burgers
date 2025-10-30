import reducer, { getFeedsThunk, initialState } from './feedsSlice';
import { TFeedsResponse } from '@api';
import { describe, expect, test } from '@jest/globals';

describe('Слайс ингредиентов', () => {
    const data: TFeedsResponse = {
        success: true,
        orders: [
            {
                _id: "order1",
                status: "done",
                name: "Тестовый бургер",
                createdAt: "2025-01-01T00:00:00.000Z",
                updatedAt: "2025-01-01T00:00:00.000Z",
                number: 123,
                ingredients: ["bun1", "main1", "sauce1", "bun1"]
            }
        ],
        total: 1,
        totalToday: 2
  };

    test('pending - isLoading: true', () => {
        const state = reducer(initialState, getFeedsThunk.pending(''));
        expect(state.isLoading).toBe(true);
    });

    test('fulfilled - isLoading: false, данные записаны в стор', () => {
        const state = reducer(initialState, getFeedsThunk.fulfilled(data, ''));
        expect(state.isLoading).toBe(false);
        expect(state.orders).toEqual(data.orders);
        expect(state.total).toEqual(data.total);
        expect(state.totalToday).toEqual(data.totalToday);
    });

    test('rejected - isLoading: false, ошибка записывается в стор', () => {
        const state = reducer(initialState, getFeedsThunk.rejected(new Error('Ошибка'), ''));
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe('Ошибка');
    });
});
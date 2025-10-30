import reducer, { getOrdersThunk, initialState } from './orderSlice';
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
        const state = reducer(initialState, getOrdersThunk.pending(''));
        expect(state.isLoading).toBe(true);
    });

    test('fulfilled - isLoading: false, данные записаны в стор', () => {
        const state = reducer(initialState, getOrdersThunk.fulfilled(data.orders, ''));
        expect(state.isLoading).toBe(false);
        expect(state.orders).toEqual(data.orders);
    });

    test('rejected - isLoading: false, ошибка записывается в стор', () => {
        const state = reducer(initialState, getOrdersThunk.rejected(new Error('Ошибка'), ''));
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe('Ошибка');
    });
});
import reducer, { getUserThunk, initialState } from './userSlice';
import { TUserResponse } from '@api';
import { describe, expect, test } from '@jest/globals';

describe('Слайс ингредиентов', () => {
    const data: TUserResponse = {
        success: true,
        user: {
                email: "test@example.com",
                name: "Test User"
            }
    };

    test('pending - isLoading: true', () => {
        const state = reducer(initialState, getUserThunk.pending(''));
        expect(state.isUserLoading).toBe(true);
    });

    test('fulfilled - isLoading: false, данные записаны в стор', () => {
        const state = reducer(initialState, getUserThunk.fulfilled(data.user, ''));
        expect(state.isUserLoading).toBe(false);
        expect(state.user).toEqual(data.user);
    });

    test('rejected - isLoading: false, ошибка записывается в стор', () => {
        const state = reducer(initialState, getUserThunk.rejected(new Error('Ошибка'), ''));
        expect(state.isUserLoading).toBe(false);
        expect(state.error).toBe('Ошибка');
    });
});
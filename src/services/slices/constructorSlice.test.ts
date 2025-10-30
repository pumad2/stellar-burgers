import reducer, {
    initialState as constructorState,
    addIngredient,
    removeIngredient,
    moveIngredient,
    resetConstructor
} from './constructorSlice';
import { TConstructorIngredient } from '@utils-types';
import { describe, expect, test } from '@jest/globals';

jest.mock('@reduxjs/toolkit', () => {
    const original = jest.requireActual('@reduxjs/toolkit');
    return { ...original, nanoid: () => 'Первый' };
});

describe('Слайс конструктора', () => {
    const main: TConstructorIngredient = {
        "id": "Первый",
        "_id": "main1",
        "name": "Котлета 1",
        "type": "main",
        "proteins": 0,
        "fat": 0,
        "carbohydrates": 0,
        "calories": 0,
        "price": 100,
        "image": "main.png",
        "image_large": "main.png",
        "image_mobile": "main.png"
    };

    test('Добавление ингредиента', () => {
        const state = reducer(constructorState, addIngredient(main));
        expect(state.constructorItems.ingredients).toEqual([main]);
    });

    test('Удаление ингредиента', () => {
        const state = reducer(constructorState, addIngredient(main));
        const newState = reducer(state, removeIngredient(main.id));
        expect(newState.constructorItems.ingredients).toEqual([]);
    });

    test('Перемещение ингредиента', () => {
        const main2 = { ...main, _id: 'main2' };
        let state = reducer(constructorState, addIngredient(main));
        state = reducer(state, addIngredient(main2));
        state = reducer(state, moveIngredient({ fromIndex: 0, toIndex: 1 }))
        expect(state.constructorItems.ingredients.map((item) => item._id)).toEqual(['main2', 'main1']);
    });

    test('Удаление ингредиента', () => {
        const state = reducer(constructorState, addIngredient(main));
        const newState = reducer(state, resetConstructor());
        expect(newState).toEqual(constructorState);
    });
});

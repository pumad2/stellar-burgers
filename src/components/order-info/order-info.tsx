import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { selectOrderModalData } from '../../services/selectors/ordersSelectors';
import { selectIngredients } from '../../services/selectors/indredientsSelectors';
import { useParams } from 'react-router-dom';
import {
  getOrderByNumberThunk,
  resetModal
} from '../../services/slices/orderSlice';
import { selectUser } from '../../services/selectors/userSelectors';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const orderData = useSelector(selectOrderModalData);
  const ingredients: TIngredient[] = useSelector(selectIngredients);
  const dispatch = useDispatch();
  const { number } = useParams<{ number: string }>();

  useEffect(() => {
    if (number && !orderData) {
      dispatch(resetModal());
      dispatch(getOrderByNumberThunk(Number(number)));
    }
  }, [dispatch, number, orderData]);
  /* Готовим данные для отображения */

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};

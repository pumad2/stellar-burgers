import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { Preloader } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { getOrdersThunk } from '../../services/slices/orderSlice';
import { selectOrders, selectOrdersIsLoading } from '../../services/selectors/ordersSelectors';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const isLoading = useSelector(selectOrdersIsLoading);
  const orders: TOrder[] = useSelector(selectOrders);

  useEffect(() => {
    dispatch(getOrdersThunk());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }
  return <ProfileOrdersUI orders={orders} />;
};

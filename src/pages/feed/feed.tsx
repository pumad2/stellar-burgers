import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { selectFeedsIsLoading, selectFeedsOrders } from '../../services/selectors/feedSelectors';
import { getFeedsThunk } from '../../services/slices/feedsSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(selectFeedsOrders);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectFeedsIsLoading);

  useEffect(() => {
    dispatch(getFeedsThunk());
  }, [dispatch]);

  if (isLoading || !orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeedsThunk())} />;
};

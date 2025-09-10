import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI, Preloader } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectConstructorIsLoading,
  selectConstructorItems,
  selectConstructorState
} from '../../services/selectors/constructorSelectors';
import {
  selectOrderModalData,
  selectOrderRequest
} from '../../services/selectors/ordersSelectors';
import { resetModal } from '../../services/slices/orderSlice';
import { selectUser } from '../../services/selectors/userSelectors';
import { useLocation, useNavigate } from 'react-router-dom';
import { orderBurgerThunk } from '../../services/slices/orderSlice';
import { resetConstructor } from '../../services/slices/constructorSlice';

export const BurgerConstructor: FC = () => {
  const orderRequest = useSelector(selectOrderRequest);
  const constructorItems = useSelector(selectConstructorItems);
  const orderModalData = useSelector(selectOrderModalData);
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectConstructorIsLoading);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */

  if (isLoading) {
    return <Preloader />;
  }

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigate('/login');
      return;
    }

    const orderIngredients = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((i) => i._id),
      constructorItems.bun._id
    ];

    dispatch(orderBurgerThunk(orderIngredients)).then(() => {
      dispatch(resetConstructor());
    });
  };
  const closeOrderModal = () => {
    dispatch(resetModal());
  };

  useEffect(() => {
    dispatch(resetModal());
  }, [dispatch]);

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};

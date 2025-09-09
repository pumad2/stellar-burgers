import { ConstructorPage, Feed, ForgotPassword, Login, NotFound404, Profile, ProfileOrders, Register, ResetPassword } from '@pages';
import '../../index.css';
import styles from './app.module.css';
import {
	Routes,
	Route,
	useLocation,
  useNavigate
} from 'react-router-dom';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { ProtectedRoute } from '../ProtectedRoute';
import React, { useEffect } from 'react';
import { AppDispatch, useDispatch } from '../../services/store';
import { getIngredientsThunk } from '../../services/slices/ingredientsSlice';
import { getUserThunk } from '../../services/slices/userSlice';
import { resetOrderByNumber } from '../../services/slices/orderSlice';

const App = () => {
  const location = useLocation();
	const backgroundLocation = location.state && location.state.background;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsThunk());
    dispatch(getUserThunk());
  }, [dispatch]);

  const onClose = () => {
    dispatch(resetOrderByNumber());
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<ProtectedRoute onlyUnAuth><Login /></ProtectedRoute>} />
        <Route path='/register' element={<ProtectedRoute onlyUnAuth><Register /></ProtectedRoute>} />
        <Route path='/forgot-password' element={<ProtectedRoute onlyUnAuth><ForgotPassword /></ProtectedRoute>} />
        <Route path='/reset-password' element={<ProtectedRoute onlyUnAuth><ResetPassword /></ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path='/profile/orders' element={<ProtectedRoute><ProfileOrders /></ProtectedRoute>} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route path='/feed/:number' element={<Modal onClose={onClose} title='Информация о заказе'><OrderInfo /></Modal>} />
          <Route path='/ingredients/:id' element={<Modal onClose={onClose} title='Детали ингредиента'><IngredientDetails /></Modal>} />
          <Route path='/profile/orders/:number' element={<ProtectedRoute><Modal onClose={onClose} title='Информация о заказе'><OrderInfo /></Modal></ProtectedRoute>} /> 
        </Routes>
      )}
    </div>
  );
};

export default App;

import React, { ReactNode, useEffect } from 'react';
import { useSelector, UseSelector } from 'react-redux';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import {
  selectUser,
  selectUserIsLoading
} from '../../services/selectors/userSelectors';
import { RootState, useDispatch } from '../../services/store';
import { Preloader } from '@ui';
import { getUserThunk } from '../../services/slices/userSlice';

type ProtectedRouteProps = {
  children: ReactNode;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth
}: ProtectedRouteProps) => {
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectUserIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user && localStorage.getItem('refreshToken')) {
      dispatch(getUserThunk());
    }
  }, [dispatch, user]);

  if (isLoading || (!user && localStorage.getItem('refreshToken'))) {
    return <Preloader />;
  }

  if (!user && !onlyUnAuth) {
    return <Navigate replace to='/login' />;
  }

  if (user && onlyUnAuth) {
    return <Navigate replace to='/profile' />;
  }

  return <>{children}</>;
};

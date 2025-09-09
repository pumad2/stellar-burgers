import React, { ReactNode } from 'react';
import {useSelector, UseSelector} from 'react-redux';
import {Outlet, Navigate, useLocation} from 'react-router-dom';
import { selectUser, selectUserIsLoading } from '../../services/selectors/userSelectors';
import { RootState } from 'src/services/store';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  children: ReactNode;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({children, onlyUnAuth = false}: ProtectedRouteProps) => {
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectUserIsLoading);

  if (isLoading) {
    return <Preloader />;
  }

  if (!user && !onlyUnAuth) {
    return <Navigate replace to='/login'/>;;
  }

  if (user && onlyUnAuth) {
    return <Navigate replace to='/profile' />;
  }

  return <>{children}</>;
};
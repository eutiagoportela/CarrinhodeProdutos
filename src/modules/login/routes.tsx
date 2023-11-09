import React from 'react';
import { RouteObject } from 'react-router-dom';

import UsuarioScreen from '../usuarios/screens/UsuarioScreen';
import LoginScreen from './screens/LoginScreen';

export enum LoginRoutesEnum {
  LOGIN = '/login',
  LOGIN_INSERT = '/login/insert',
}

export const loginRoutes: RouteObject[] = [
  {
    path: LoginRoutesEnum.LOGIN,
    element: <LoginScreen />,
  },
  {
    path: LoginRoutesEnum.LOGIN_INSERT,
    element: <UsuarioScreen />,
  },
];

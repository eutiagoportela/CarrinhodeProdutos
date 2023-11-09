import React from 'react';
import { RouteObject } from 'react-router-dom';

import UsuarioScreen from '../usuarios/screens/UsuarioScreen';
export enum LoginRoutesEnum {
  LOGIN_INSERT = '/login/insert',
}

export const UsuarioScreenRoutes: RouteObject[] = [
  {
    path: LoginRoutesEnum.LOGIN_INSERT,
    element: <UsuarioScreen />,
  },
];

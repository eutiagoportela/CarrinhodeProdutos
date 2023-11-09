import React from 'react';
import { RouteObject } from 'react-router-dom';

import PedidosRealizadosScreen from './screens/PedidosRealizadosScreen';

export enum PedidosRoutesEnum {
  PEDIDOSREALIZADOS = '/pedidosrealizados',
}

export const pedidosScreens: RouteObject[] = [
  {
    path: PedidosRoutesEnum.PEDIDOSREALIZADOS,
    element: <PedidosRealizadosScreen />,
  },
];

import React from 'react';
import { RouteObject } from 'react-router-dom';

import { FinalizarPedido } from './screens/FinalizarPedido';

export enum finalizaCarrinhoRoutesEnum {
  FINALIZARCARRINHO = '/carrinho/finalizar',
}

export const finalizaCarrinhoScreens: RouteObject[] = [
  {
    path: finalizaCarrinhoRoutesEnum.FINALIZARCARRINHO,
    element: <FinalizarPedido />,
  },
];

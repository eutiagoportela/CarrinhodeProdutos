import React from 'react';
import { RouteObject } from 'react-router-dom';

import ProdutosCarrinho from './screens/ProdutosCarrinho';

export enum ProdutosCarrinhoRoutesEnum {
  CARRINHO = '/carrinho',
  FINALIZAR_CARRINHO = '/carrinho/finalizar',
}

export const CarrinhoScreens: RouteObject[] = [
  {
    path: ProdutosCarrinhoRoutesEnum.CARRINHO,
    element: <ProdutosCarrinho />,
  },
];

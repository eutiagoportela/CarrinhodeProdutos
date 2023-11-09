import React from 'react';
import { RouteObject } from 'react-router-dom';

import Produto from './screens/ProdutosScreen';

export enum ProdutoRoutesEnum {
  PRODUTO = '/produto',
}

export const produtoScreens: RouteObject[] = [
  {
    path: ProdutoRoutesEnum.PRODUTO,
    element: <Produto />,
  },
];

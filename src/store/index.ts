import { configureStore } from '@reduxjs/toolkit';

import globalReducer from './reduces/globalReducer';
import pedidosReducer from './reduces/pedidosReducer';
import produtoReducer from './reduces/produtoReducer';
import usuarioReducer from './reduces/produtoReducer';
import produtoCarrinhoReducer from './reduces/produtosCarrinhoReducer';

export const store = configureStore({
  reducer: {
    produtoReducer,
    produtoCarrinhoReducer,
    pedidosReducer,
    globalReducer,
    usuarioReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;

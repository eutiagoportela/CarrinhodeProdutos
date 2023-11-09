import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProdutoType } from '../../../shared/types/ProdutosType';

interface ProdutoCarrinhoState {
  produtosCarrinho: ProdutoType[];
}

const initialState: ProdutoCarrinhoState = {
  produtosCarrinho: [],
};

export const counterSlice = createSlice({
  name: 'produtoCarrinhoReducer',
  initialState,
  reducers: {
    setProdutosCarrinhoAction: (state, action: PayloadAction<ProdutoType[]>) => {
      state.produtosCarrinho = action.payload;
    },
  },
});

export const { setProdutosCarrinhoAction } = counterSlice.actions;

export default counterSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ProdutoType } from '../../../shared/types/ProdutosType';

interface ProdutoState {
  produtos: ProdutoType[];
}

const initialState: ProdutoState = {
  produtos: [],
};

export const counterSlice = createSlice({
  name: 'produtoReducer',
  initialState,
  reducers: {
    setProdutosAction: (state, action: PayloadAction<ProdutoType[]>) => {
      state.produtos = action.payload;
    },
  },
});

export const { setProdutosAction } = counterSlice.actions;

export default counterSlice.reducer;

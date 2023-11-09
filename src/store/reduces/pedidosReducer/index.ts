import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PedidosType } from '../../../shared/types/PedidosType';

interface PedidosState {
  pedidosRealizados: PedidosType[];
}

const initialState: PedidosState = {
  pedidosRealizados: [],
};

export const counterSlice = createSlice({
  name: 'pedidosReducer',
  initialState,
  reducers: {
    setPedidosAction: (state, action: PayloadAction<PedidosType[]>) => {
      state.pedidosRealizados = action.payload;
    },
  },
});

export const { setPedidosAction } = counterSlice.actions;

export default counterSlice.reducer;

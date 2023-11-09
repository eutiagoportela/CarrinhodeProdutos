import { useDispatch } from 'react-redux';

import { PedidosType } from '../../../shared/types/PedidosType';
import { useAppSelector } from '../../hooks';
import { setPedidosAction } from '.';

export const userPedidosReducer = () => {
  const dispatch = useDispatch();
  const { pedidosRealizados } = useAppSelector((state) => state.pedidosReducer);

  const setPedidosRealizados = (Currentpedido: PedidosType[]) => {
    dispatch(setPedidosAction(Currentpedido));
  };

  return {
    pedidosRealizados,
    setPedidosRealizados,
  };
};

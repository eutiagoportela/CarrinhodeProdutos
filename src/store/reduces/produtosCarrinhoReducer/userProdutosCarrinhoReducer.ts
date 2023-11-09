import { useDispatch } from 'react-redux';

import { ProdutosType } from '../../../shared/types/ProdutosType';
import { useAppSelector } from '../../hooks';
import { setProdutosCarrinhoAction } from '.';

export const userProdutosCarrinhoReducer = () => {
  const dispatch = useDispatch();
  const { produtosCarrinho } = useAppSelector((state) => state.produtoCarrinhoReducer);

  const setProdutosCarrinho = (CurrentprodutosCarrinho: ProdutosType[]) => {
    dispatch(setProdutosCarrinhoAction(CurrentprodutosCarrinho));
  };

  return {
    produtosCarrinho,
    setProdutosCarrinho,
  };
};

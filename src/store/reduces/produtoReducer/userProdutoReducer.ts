import { useDispatch } from 'react-redux';

import { ProdutosType } from '../../../shared/types/ProdutosType';
import { useAppSelector } from '../../hooks';
import { setProdutosAction } from '.';

export const useProdutoReducer = () => {
  const dispatch = useDispatch();
  const { produtos } = useAppSelector((state) => state.produtoReducer);

  const setProdutos = (produtos: ProdutosType[]) => {
    dispatch(setProdutosAction(produtos));
  };

  return {
    produtos,
    setProdutos,
  };
};

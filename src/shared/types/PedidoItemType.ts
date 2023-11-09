import { PedidosType } from './PedidosType';
import { ProdutosType } from './ProdutosType';

export interface PedidoItemType {
  id: number | undefined;
  quantidade: number;
  preco: number;
  total: number;
  pedidosId: number | undefined;
  pedido?: PedidosType | undefined;
  produtosId: number | undefined;
  produto?: ProdutosType | undefined;
}

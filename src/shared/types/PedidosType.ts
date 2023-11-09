import { PedidoItemType } from './PedidoItemType';

export interface PedidosType {
  id: number;
  data: Date;
  valor: number;
  observacao: string;
  usuarioId: number;
  usuarioEmail: string;
  pedidoItens: PedidoItemType[];
}

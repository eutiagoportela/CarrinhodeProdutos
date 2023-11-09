import { CategoriasType } from './CategoriasType';

export interface ProdutosType {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  quantidade: number;
  imagem: string;
  categoriaNome: string;
  categoria?: CategoriasType;
}

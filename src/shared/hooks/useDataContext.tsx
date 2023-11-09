import React from 'react';
import { createContext, useContext, useState } from 'react';

import { ProdutosType } from '../types/ProdutosType';
import { UsuariosType } from '../types/UsuariosType';

interface DataContext {
  produtos?: ProdutosType[];
  produtosCarrinho?: ProdutosType[];
  usuarios?: UsuariosType[];
}

interface DataContextProps {
  data: DataContext;
  setData: (data: DataContext) => void;
}

const DataContext = createContext({} as DataContextProps);

interface DataProviderProps {
  children: React.ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const [data, setData] = useState<DataContext>({});

  return <DataContext.Provider value={{ data, setData }}>{children}</DataContext.Provider>;
};

export const useDataContext = () => {
  const { data, setData } = useContext(DataContext);

  const setProdutos = (produtos: ProdutosType[]) => {
    setData({
      ...data,
      produtos,
    });
  };

  const setProdutosCarrinho = (produtosCarrinho: ProdutosType[]) => {
    setData({
      ...data,
      produtosCarrinho,
    });
  };

  const setUsuarios = (usuarios: UsuariosType[]) => {
    setData({
      ...data,
      usuarios,
    });
  };

  return {
    produtos: data?.produtos || [],
    produtosCarrinho: data?.produtos || [],
    usuarios: data?.usuarios || [],
    setProdutos,
    setUsuarios,
    setProdutosCarrinho,
  };
};

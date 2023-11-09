import React, { useState } from 'react';

import Screen from '../../../shared/components/screen/Screen';
import { Carrinho } from '../componentes/Carrinho';
import { ListaProdutos } from '../componentes/ListaProdutos';

const ProdutosCarrinho = () => {
  const [allProdutosCarrinho, setAllProdutosCarrinho] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);

  return (
    <>
      <Screen>
        <Carrinho
          allProdutosCarrinho={allProdutosCarrinho}
          setAllProdutosCarrinho={setAllProdutosCarrinho}
          total={total}
          setTotal={setTotal}
          countProducts={countProducts}
          setCountProducts={setCountProducts}
        />
        <ListaProdutos
          allProdutosCarrinho={allProdutosCarrinho}
          setAllProdutosCarrinho={setAllProdutosCarrinho}
          total={total}
          setTotal={setTotal}
          countProducts={countProducts}
          setCountProducts={setCountProducts}
        />
      </Screen>
    </>
  );
};

export default ProdutosCarrinho;

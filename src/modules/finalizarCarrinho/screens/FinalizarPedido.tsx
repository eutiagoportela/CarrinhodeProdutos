import { Box, Card, CardContent } from '@material-ui/core';
import React from 'react';

import ListaPedidoProdutosCarrinho from '../componentes/ListaPedidoProdutosCarrinho';
import ResumoPedido from '../componentes/ResumoPedido';

export const FinalizarPedido = () => {
  return (
    <Box display="flex">
      <Card style={{ width: '70%', flex: 3, overflow: 'auto' }}>
        <CardContent style={{ width: '100%' }}>
          <ListaPedidoProdutosCarrinho />
        </CardContent>
      </Card>
      <Card style={{ width: '30%', flex: 1 }} elevation={3}>
        <CardContent style={{ width: '100%' }}>
          <ResumoPedido />
        </CardContent>
      </Card>
    </Box>
  );
};

import { Box, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../shared/components/button/Button';
import { URL_INSERTPEDIDO } from '../../../shared/constants/urls';
import { connectionAPIPost } from '../../../shared/functions/connectionAPI';
import { PedidosType } from '../../../shared/types/PedidosType';
import { ProdutosType } from '../../../shared/types/ProdutosType';
import { DatabaseService } from '../../../store/indexedDB/DatabaseProvider';
import { useGlobalReducer } from '../../../store/reduces/globalReducer/useGlobalReducer';

const ResumoPedido = () => {
  const [loading, setLoading] = useState(false);
  const [pedidoNovo, setPedido] = useState<PedidosType>({} as PedidosType);
  const [total, setTotal] = useState(0);
  const [allProdutosCarrinho, setAllProdutosCarrinho] = useState<ProdutosType[]>([]);
  const { setNotification, user } = useGlobalReducer();
  const navigate = useNavigate();

  const handleSalvar = async () => {
    setLoading(true);

    const currentDateTime = new Date();
    pedidoNovo.data = new Date(currentDateTime.toLocaleString('pt-BR'));
    pedidoNovo.valor = total;
    pedidoNovo.observacao = 'observacao';
    pedidoNovo.usuarioId = 1; //codigo do usuario
    pedidoNovo.usuarioEmail = user?.usuario || '';

    pedidoNovo.pedidoItens = allProdutosCarrinho.map((produto) => ({
      quantidade: produto.quantidade,
      preco: produto.preco,
      total: produto.preco * produto.quantidade,
      produtosId: produto.id,
      pedidosId: undefined,
      pedido: undefined,
      produto: undefined,
      id: undefined,
    }));

    setPedido(pedidoNovo);
    console.log(pedidoNovo);

    await connectionAPIPost(URL_INSERTPEDIDO, pedidoNovo)
      .then(() => {
        setNotification('Sucesso!', 'success', 'Pedido enviado com sucesso!');

        DatabaseService.deleteAllItems();

        navigate(-1);
      })
      .catch((error: Error) => {
        setNotification(error.message, 'error');
      });
    setLoading(false);
  };

  const getTodosFromDatabase = () => {
    DatabaseService.init().then(async () => {
      const produtosCarrinho = await DatabaseService.getAll();
      setAllProdutosCarrinho(produtosCarrinho);

      const valorTotal = produtosCarrinho.reduce(
        (total, produto) => total + produto.preco * produto.quantidade,
        0,
      );
      setTotal(valorTotal);
    });
  };

  useEffect(getTodosFromDatabase, []);

  return (
    <Box alignItems="center">
      <Paper elevation={4}>
        <Box p={4}>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Box fontWeight="bold">Subtotal</Box>
            <Box>R$ 0,00</Box>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Box fontWeight="bold">Taxa de entrega</Box>
            <Box>R$ 0,00</Box>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Box fontWeight="bold">Total</Box>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{ fontSize: '20px' }}
            >
              {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </Typography>
          </Box>

          <Button
            loading={loading}
            type="primary"
            margin="20px 0px 16px 0px"
            onClick={handleSalvar}
          >
            ENTRAR
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ResumoPedido;

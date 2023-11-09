import {
  Card,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import TableCell from '@mui/material/TableCell';
import React, { useEffect, useState } from 'react';

import { ProdutosType } from '../../../shared/types/ProdutosType';
import { DatabaseService } from '../../../store/indexedDB/DatabaseProvider';

const ListaPedidoProdutosCarrinho = () => {
  const [allProdutosCarrinho, setAllProdutosCarrinho] = useState<ProdutosType[]>([]);

  const getTodosFromDatabase = () => {
    DatabaseService.init().then(async () => {
      const produtosCarrinho = await DatabaseService.getAll();
      setAllProdutosCarrinho(produtosCarrinho);
    });
  };

  useEffect(getTodosFromDatabase, []);

  return (
    <Paper elevation={2}>
      <Card elevation={4}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Imagem</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>Preço</TableCell>
                <TableCell>Quantidade</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allProdutosCarrinho.map((produto) => (
                <TableRow key={produto.id}>
                  <TableCell>
                    <img
                      src={produto.imagem || '/logo.png'}
                      alt={produto.nome}
                      style={{
                        width: '80px',
                        height: '80px',
                        objectPosition: 'center',
                      }}
                    />
                  </TableCell>
                  <TableCell>{produto.nome}</TableCell>
                  <TableCell>{produto.descricao}</TableCell>
                  <TableCell>
                    {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </TableCell>
                  <TableCell>{produto.quantidade}</TableCell>
                  <TableCell>
                    {(produto.preco * produto.quantidade).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}{' '}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Paper>
  );
};

export default ListaPedidoProdutosCarrinho;

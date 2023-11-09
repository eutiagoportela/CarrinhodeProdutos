import {
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import React from 'react';

import Screen from '../../../shared/components/screen/Screen';
import { URL_PEDIDOSREALIZADOS } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { PedidosType } from '../../../shared/types/PedidosType';
import { userPedidosReducer } from '../../../store/reduces/pedidosReducer/userPedidosReducer';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const PedidosRealizadosScreen = () => {
  const { pedidosRealizados, setPedidosRealizados } = userPedidosReducer();
  const { request } = useRequests();
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<PedidosType>();

  useEffect(() => {
    setPedidosRealizados([]);
    request<PedidosType[]>(URL_PEDIDOSREALIZADOS, MethodsEnum.GET, setPedidosRealizados);
  }, []);

  const handleClickOpen = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Screen>
      <Typography variant="h4" component="h1">
        Pedidos Realizados
      </Typography>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="xl">
        <DialogTitle id="form-dialog-title">Itens do Pedido</DialogTitle>
        <DialogContent>
          <Card elevation={4}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Id</StyledTableCell>
                    <StyledTableCell>Img</StyledTableCell>
                    <StyledTableCell>Produto</StyledTableCell>
                    <StyledTableCell>Quantidade</StyledTableCell>
                    <StyledTableCell>Preco</StyledTableCell>
                    <StyledTableCell>Total</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedOrder?.pedidoItens.map((itempedido, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>{itempedido.id}</StyledTableCell>
                      <StyledTableCell>
                        <img
                          src={itempedido.produto?.imagem || '/logo.png'}
                          alt={itempedido.produto?.nome || ''}
                          style={{
                            width: '80px',
                            height: '80px',
                            objectPosition: 'center',
                          }}
                        />
                      </StyledTableCell>

                      <StyledTableCell>{itempedido.produto?.nome || ''}</StyledTableCell>
                      <StyledTableCell>{itempedido.quantidade}</StyledTableCell>
                      <StyledTableCell>
                        {itempedido.preco.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </StyledTableCell>

                      <StyledTableCell>
                        {itempedido.total.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Fechar
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      <Card elevation={4}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Id</StyledTableCell>
                <StyledTableCell>Data</StyledTableCell>
                <StyledTableCell>Valor</StyledTableCell>
                <StyledTableCell>Observação</StyledTableCell>
                <StyledTableCell>Usuário</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pedidosRealizados.map((pedido, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>{pedido.id}</StyledTableCell>
                  <StyledTableCell>
                    {new Date(pedido.data).toLocaleDateString('pt-BR')}
                  </StyledTableCell>
                  <StyledTableCell>
                    {pedido.valor
                      ? pedido.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                      : ''}
                  </StyledTableCell>
                  <StyledTableCell>{pedido.observacao}</StyledTableCell>
                  <StyledTableCell>{pedido.usuarioEmail}</StyledTableCell>
                  <StyledTableCell>
                    <Button onClick={() => handleClickOpen(pedido)}>Itens do Pedido</Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Screen>
  );
};

export default PedidosRealizadosScreen;

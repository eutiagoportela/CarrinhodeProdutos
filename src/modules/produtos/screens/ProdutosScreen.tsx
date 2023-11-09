import {
  Box,
  Card,
  Paper,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useEffect, useState } from 'react';
import React from 'react';

import Screen from '../../../shared/components/screen/Screen';
import { URL_PRODUTO } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { ProdutosType } from '../../../shared/types/ProdutosType';
import { useProdutoReducer } from '../../../store/reduces/produtoReducer/userProdutoReducer';

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

const Produtos = () => {
  const { produtos, setProdutos } = useProdutoReducer();
  const [productsFiltered, setProdutsFiltered] = useState<ProdutosType[]>([]);
  const { request } = useRequests();

  useEffect(() => {
    let isMounted = true;

    request<ProdutosType[]>(URL_PRODUTO, MethodsEnum.GET).then((result) => {
      if (isMounted) {
        setProdutos(result as ProdutosType[]);
        setProdutsFiltered([...(result as ProdutosType[])]);
        console.log('passou filtro');
        console.log(result);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const onSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const value = event.target.value.toUpperCase();
    if (!value) {
      setProdutsFiltered([...produtos]);
    } else {
      setProdutsFiltered(
        produtos.filter(
          (produto) =>
            produto.nome.toUpperCase().includes(value) ||
            produto.categoriaNome.toUpperCase().includes(value),
        ),
      );
    }

    console.log(productsFiltered);
    console.log(produtos);
  };

  return (
    <Screen>
      <Typography variant="h4" component="h1">
        Produtos
      </Typography>
      <Card elevation={4}>
        <Box width={'100%'}>
          <TextField
            type="search"
            id="filled-search"
            variant="filled"
            placeholder="Buscar produto"
            style={{ width: '100%' }}
            onChange={onSearch}
          />
        </Box>
      </Card>
      <Card elevation={4}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Id</StyledTableCell>
                <StyledTableCell>Imagem</StyledTableCell>
                <StyledTableCell>Nome</StyledTableCell>
                <StyledTableCell>Descrição</StyledTableCell>
                <StyledTableCell>Preço</StyledTableCell>
                <StyledTableCell>Estoque</StyledTableCell>
                <StyledTableCell>Categoria</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productsFiltered.map((produto) => (
                <StyledTableRow key={produto.id}>
                  <StyledTableCell>
                    <img
                      src={produto.imagem || '/logo.png'}
                      alt={produto.nome}
                      style={{
                        width: '80px',
                        height: '80px',
                        objectPosition: 'center',
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell>{produto.id}</StyledTableCell>
                  <StyledTableCell>{produto.nome}</StyledTableCell>
                  <StyledTableCell>{produto.descricao}</StyledTableCell>
                  <StyledTableCell>
                    {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </StyledTableCell>
                  <StyledTableCell>{produto.estoque}</StyledTableCell>
                  <StyledTableCell>{produto.categoriaNome}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Screen>
  );
};

export default Produtos;

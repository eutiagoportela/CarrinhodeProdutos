import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import { Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';

import { URL_PRODUTO } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { ProdutosType } from '../../../shared/types/ProdutosType';
import { userProdutosCarrinhoReducer } from '../../../store/reduces/produtosCarrinhoReducer/userProdutosCarrinhoReducer';
import { ContainerItems } from '../styles/carrinho.styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 400, // Adjust the maxWidth value to make the cards larger
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9 aspect ratio
  },
});

export const ListaProdutos = ({
  allProdutosCarrinho,
  setAllProdutosCarrinho,
  countProducts,
  setCountProducts,
  total,
  setTotal,
}) => {
  const classes = useStyles();
  const { request } = useRequests();
  const { produtosCarrinho, setProdutosCarrinho } = userProdutosCarrinhoReducer();
  const [produtosFiltrados, setProdutsFiltered] = useState<ProdutosType[]>([]);

  useEffect(() => {
    let isMounted = true;

    request<ProdutosType[]>(URL_PRODUTO, MethodsEnum.GET).then((result) => {
      if (isMounted) {
        setProdutosCarrinho(result as ProdutosType[]);
        setProdutsFiltered([...(result as ProdutosType[])]);
        console.log('passou filtro');
        console.log(result);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const onAddProduct = async (produto) => {
    // Check if the product already exists in the cart
    if (allProdutosCarrinho.find((item) => item.id === produto.id)) {
      const products = allProdutosCarrinho.map((item) =>
        item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item,
      );
      setTotal(total + produto.preco * produto.quantidade);
      setCountProducts(countProducts + produto.quantidade);

      return setAllProdutosCarrinho([...products]);
    }

    console.log(produto.quantidade);
    setTotal(total + produto.preco * 1);
    setCountProducts(countProducts + 1);

    return setAllProdutosCarrinho([...allProdutosCarrinho, produto]);
  };
  const onSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const value = event.target.value.toUpperCase();
    if (!value) {
      setProdutsFiltered([...produtosCarrinho]);
    } else {
      setProdutsFiltered(
        produtosCarrinho.filter(
          (produto) =>
            produto.nome.toUpperCase().includes(value) ||
            produto.categoriaNome.toUpperCase().includes(value),
        ),
      );
    }

    console.log(produtosFiltrados);
    console.log(produtosCarrinho);
  };

  return (
    <div>
      <Typography variant="h4" component="h1">
        Produtos
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            type="search"
            placeholder="Buscar produto"
            style={{ width: '100%' }}
            onChange={onSearch}
          />
        </Grid>
      </Grid>
      <ContainerItems style={{ marginTop: '16px' }}>
        {produtosFiltrados.map((produto) => (
          <Card className={classes.root} key={produto.id} style={{ marginBottom: '16px' }}>
            <CardMedia className={classes.media} image={produto.imagem} title={produto.nome} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {produto.nome}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                style={{ fontSize: '20px' }}
              >
                {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                style={{ color: 'blue' }}
              >
                {produto.categoriaNome}
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={() => onAddProduct(produto)} variant="contained" color="primary">
                Inserir no Carrinho
              </Button>
            </CardActions>
          </Card>
        ))}
      </ContainerItems>
    </div>
  );
};

import { AppBar, Badge, Grid, Menu, MenuItem, Toolbar } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DatabaseService } from '../../../store/indexedDB/DatabaseProvider';
import { finalizaCarrinhoRoutesEnum } from '../../finalizarCarrinho/routes';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  cart: {
    marginRight: theme.spacing(2),
  },
}));

export const Carrinho = ({
  allProdutosCarrinho,
  setAllProdutosCarrinho,
  total,
  countProducts,
  setCountProducts,
  setTotal,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    DatabaseService.deleteAllItems();
    DatabaseService.init();
  }, []);

  const onDeleteProduct = async (produto) => {
    const results = allProdutosCarrinho.filter((item) => item.id !== produto.id);

    console.log(produto.preco);
    console.log(produto);
    console.log(produto.quantidade);
    console.log(total);
    setTotal(total - produto.preco * produto.quantidade);
    setCountProducts(countProducts - 1);
    setAllProdutosCarrinho(results);
  };

  const onCleanCart = async () => {
    setAllProdutosCarrinho([]);
    setTotal(0);
    setCountProducts(0);
  };

  const onFinalize = () => {
    DatabaseService.deleteAllItems();
    const allTodos = DatabaseService.add(allProdutosCarrinho);
    console.log(allTodos);

    navigate(finalizaCarrinhoRoutesEnum.FINALIZARCARRINHO);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log('passou aqui');
  };

  const handleClose = () => {
    setAnchorEl(null);
    console.log('passou aqui Close');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ marginBottom: '1%' }}>
        <Toolbar>
          <Box display="flex" alignItems="center" width="100%">
            <Typography variant="h6" className={classes.title}>
              Produtos
            </Typography>
            <Box flexGrow={1} />
            <IconButton
              className={classes.cart}
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleClick}
            >
              <Badge badgeContent={countProducts} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{ border: '1px solid black' }}
      >
        {allProdutosCarrinho.map((produto, index) => (
          <div key={produto.id}>
            <MenuItem style={{ border: '1px solid black', marginBottom: '8px' }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <img
                  src={produto.imagem || '/logo.png'}
                  alt={produto.nome}
                  style={{
                    width: '80px',
                    height: '80px',
                    objectPosition: 'center',
                  }}
                />
                <Box mx={5}>
                  <Typography variant="body1" style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                    {produto.nome}
                  </Typography>
                  <Box ml={5}>
                    <Typography variant="body2">
                      {produto.preco.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box ml={5}>
                <Typography variant="body2"> x{produto.quantidade} </Typography>
              </Box>
              <IconButton onClick={() => onDeleteProduct(produto)}>
                <DeleteIcon />
              </IconButton>
            </MenuItem>
            {index !== allProdutosCarrinho.length - 1 && <Divider />}
          </div>
        ))}
        <MenuItem>
          <Button
            onClick={onCleanCart}
            variant="contained"
            color="secondary"
            fullWidth
            style={{ marginTop: '50px' }}
          >
            Esvaziar Carrinho
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            onClick={onFinalize}
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '10px' }}
          >
            Finalizar Pedido
          </Button>
        </MenuItem>
        <MenuItem>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography
                variant="body1"
                style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '1.5rem' }}
              >
                Total
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="body1"
                style={{ fontWeight: 'bold', textAlign: 'right', fontSize: '1.5rem' }}
              >
                {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </Typography>
            </Grid>
          </Grid>
        </MenuItem>
      </Menu>
    </div>
  );
};

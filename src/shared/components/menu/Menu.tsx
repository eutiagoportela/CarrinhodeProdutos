import Carrinho from '@material-ui/icons/BarChart';
import HomeIcon from '@material-ui/icons/Home';
import LaptopIcon from '@material-ui/icons/Laptop';
import type { MenuProps } from 'antd';
import { Menu as MenuAntd } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ProdutosCarrinhoRoutesEnum } from '../../../modules/carrinho/routes';
import { PedidosRoutesEnum } from '../../../modules/pedidosrealizados/routes';
import { ProdutoRoutesEnum } from '../../../modules/produtos/routes';
import { ContainerLogoName, ContainerMenu, LogoMenu, NameCompany } from './menu.style';

type MenuItem = Required<MenuProps>['items'][number];

const Menu = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState('1');

  const items: MenuItem[] = [
    {
      key: 'home',
      label: 'Catálogo de Produtos',
      icon: <HomeIcon />,
      onClick: () => navigate(ProdutosCarrinhoRoutesEnum.CARRINHO),
    },
    {
      key: 'produto',
      label: 'Produtos',
      icon: <LaptopIcon />,
      onClick: () => navigate(ProdutoRoutesEnum.PRODUTO),
    },

    {
      key: 'order',
      label: 'Pedidos Realizados',
      icon: <Carrinho />,
      onClick: () => navigate(PedidosRoutesEnum.PEDIDOSREALIZADOS),
    },
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return (
    <ContainerMenu>
      <ContainerLogoName>
        <LogoMenu src="./logo.png" alt="Logo" />
        <NameCompany>Carrinho de Produtos</NameCompany>
      </ContainerLogoName>
      <MenuAntd
        theme="dark"
        onClick={onClick}
        style={{ width: 240 }}
        defaultOpenKeys={['sub1']}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />
    </ContainerMenu>
  );
};

export default Menu;

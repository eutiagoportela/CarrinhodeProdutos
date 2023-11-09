import { Spin } from 'antd';
import { useEffect } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useGlobalReducer } from '../../../store/reduces/globalReducer/useGlobalReducer';
import { ProdutoRoutesEnum } from '../../produtos/routes';

const FirstScreen = () => {
  const { user } = useGlobalReducer();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(ProdutoRoutesEnum.PRODUTO);
    }
  }, []);

  return <Spin />;
};

export default FirstScreen;

import { NavigateFunction, redirect } from 'react-router-dom';

import { LoginRoutesEnum } from '../../modules/login/routes';
import { AUTHORIZATION_KEY } from '../constants/authorizationConstants';
import { getItemStorage, removeItemStorage, setItemStorage } from './storageProxy';

export const unsetAuthorizationToken = () => removeItemStorage(AUTHORIZATION_KEY);

export const setAuthorizationToken = (token?: string) => {
  if (token) {
    setItemStorage(AUTHORIZATION_KEY, token);
  }
};

export const getAuthorizationToken = () => getItemStorage(AUTHORIZATION_KEY);

export const verifyLoggedIn = async () => {
  const token = getAuthorizationToken();
  if (!token) {
    return redirect(LoginRoutesEnum.LOGIN);
  }

  return null;
};

export const logout = (navigate: NavigateFunction) => {
  unsetAuthorizationToken();

  /* try {
    const { setProdutosCarrinho } = userProdutosCarrinhoReducer();
    const { setProdutos } = useProdutoReducer();

    setProdutosCarrinho([]);
    setProdutos([]);
  } catch (error) {
    // Handle the error here
  }*/

  navigate(LoginRoutesEnum.LOGIN);
};

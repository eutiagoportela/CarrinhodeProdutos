import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthType } from '../../modules/login/types/AuthType';
import { ProdutoRoutesEnum } from '../../modules/produtos/routes';
import { useGlobalReducer } from '../../store/reduces/globalReducer/useGlobalReducer';
import { ERROR_INVALID_PASSWORD } from '../constants/errosStatus';
import { URL_AUTH } from '../constants/urls';
import { setAuthorizationToken } from '../functions/auth';
import ConnectionAPI, { connectionAPIPost, MethodType } from '../functions/connectionAPI';

export const useRequests = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setNotification, setUser } = useGlobalReducer();

  const request = async <T>(
    url: string,
    method: MethodType,
    saveGlobal?: (object: T) => void,
    body?: unknown,
  ): Promise<T | undefined> => {
    setLoading(true);

    const returnObject: T | undefined = await ConnectionAPI.connect<T>(url, method, body)
      .then((result) => {
        if (saveGlobal) {
          console.log(result);
          saveGlobal(result);
        }
        return result;
      })
      .catch((error: Error) => {
        setNotification(error.message, 'error');
        return undefined;
      });

    setLoading(false);

    return returnObject;
  };

  const authRequest = (body: unknown): void => {
    setLoading(true);

    connectionAPIPost<AuthType>(URL_AUTH, body)
      .then((result) => {
        setUser(result.user);
        setAuthorizationToken(result.token);
        navigate(ProdutoRoutesEnum.PRODUTO);
      })
      .catch(() => {
        setNotification(ERROR_INVALID_PASSWORD, 'error');
      });

    setLoading(false);
  };

  return {
    loading,
    authRequest,
    request,
  };
};

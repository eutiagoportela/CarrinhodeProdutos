import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_INSERTUSUARIO } from '../../../shared/constants/urls';
import { InsertUsuario } from '../../../shared/dtos/InsertUsuario.dto';
import { connectionAPIPost } from '../../../shared/functions/connectionAPI';
import { useGlobalReducer } from '../../../store/reduces/globalReducer/useGlobalReducer';
import { LoginRoutesEnum } from '../../login/routes';

export const useInsertUsuario = () => {
  const [usuario, setUsuarios] = useState<InsertUsuario>({
    Email: 'user@gmail..com',
    Password: 'aaaaaaaaaa',
  });
  const navigate = useNavigate();
  const { setNotification } = useGlobalReducer();
  const [loading, setLoading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, nameObject: string) => {
    setUsuarios({
      ...usuario,
      [nameObject]: event.target.value,
    });
  };

  useEffect(() => {
    if (usuario.Email && usuario.Password && usuario.Password.length >= 10) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [usuario]);

  const voltar = () => {
    navigate(LoginRoutesEnum.LOGIN);
  };

  const handleSalvar = async () => {
    setLoading(true);
    await connectionAPIPost(URL_INSERTUSUARIO, usuario)
      .then(() => {
        setNotification('Sucesso!', 'success', 'Usuario inserido com sucesso!');
        navigate(LoginRoutesEnum.LOGIN);
      })
      .catch((error: Error) => {
        setNotification(error.message, 'error');
      });
    setLoading(false);
  };

  return {
    usuario,
    loading,
    voltar,
    disabledButton,
    onChange,
    handleSalvar,
  };
};

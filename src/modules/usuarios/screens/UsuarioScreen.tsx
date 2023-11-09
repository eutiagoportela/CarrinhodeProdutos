import React from 'react';

import Button from '../../../shared/components/button/Button';
import Input from '../../../shared/components/input/Input';
import { useInsertUsuario } from '../hooks/useInsertUsuario';
import { ContainerUsuario, LimitedContainer } from '../styles/usuarioScreen.styles';

const UsuarioScreen = () => {
  const { usuario, loading, disabledButton, onChange, handleSalvar, voltar } = useInsertUsuario();

  return (
    <ContainerUsuario>
      <LimitedContainer>
        <Input
          titulo="USUÁRIO"
          name="Email"
          type="email"
          value={usuario.Email}
          onChange={(event) => onChange(event, 'Email')}
        />
        <Input
          name="Password"
          type="password"
          titulo="SENHA"
          onChange={(event) => onChange(event, 'Password')}
          value={usuario.Password}
        />

        <Button
          loading={loading}
          disabled={disabledButton}
          type="primary"
          margin="20px 0px 16px 0px"
          onClick={handleSalvar}
        >
          CADASTRAR
        </Button>
        <Button onClick={voltar} target="_blank">
          Voltar
        </Button>
      </LimitedContainer>
    </ContainerUsuario>
  );
};

export default UsuarioScreen;

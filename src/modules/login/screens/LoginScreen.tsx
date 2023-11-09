import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../shared/components/button/Button';
import Input from '../../../shared/components/input/Input';
import { useRequests } from '../../../shared/hooks/useRequests';
import { LoginRoutesEnum } from '../routes';
import {
  BackgroundImage,
  ContainerLogin,
  LimitedContainer,
  LogoImage,
} from '../styles/loginScreen.styles';

const LoginScreen = () => {
  const [email, setEmail] = useState('user@gmail..com');
  const [password, setPassword] = useState('aaaaaaaaaa');
  const { authRequest, loading } = useRequests();
  const navigate = useNavigate();

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    authRequest({
      Email: email,
      Password: password,
    });
  };

  const handleOnClickInsert = () => {
    navigate(LoginRoutesEnum.LOGIN_INSERT);
  };

  return (
    <div>
      <BackgroundImage src="./carrinho.jpg" />
      <ContainerLogin>
        <LimitedContainer>
          <LogoImage src="./logo.png" />
          <Input titulo="USUÁRIO" name="email" type="email" value={email} onChange={handleEmail} />
          <Input
            name="password"
            type="password"
            titulo="SENHA"
            onChange={handlePassword}
            value={password}
          />

          <Button loading={loading} type="primary" margin="20px 0px 16px 0px" onClick={handleLogin}>
            ENTRAR
          </Button>

          <Button onClick={handleOnClickInsert} target="_blank">
            Cadastre-se
          </Button>
        </LimitedContainer>
      </ContainerLogin>
    </div>
  );
};

export default LoginScreen;

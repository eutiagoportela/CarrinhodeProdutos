import { Divider } from 'antd';
import React from 'react';

import Header from '../header/Header';
import Menu from '../menu/Menu';
import { ScreenContainer } from './screen.style';

interface ScreenProps {
  children: React.ReactNode;
}

const Screen = ({ children }: ScreenProps) => {
  return (
    <>
      <Header />
      <ScreenContainer>
        <Menu />

        <Divider />
        {children}
      </ScreenContainer>
    </>
  );
};

export default Screen;

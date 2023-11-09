import { Input as InputAntd, InputProps as InputPropsAntd } from 'antd';
import React from 'react';

import { InputTestIdEnum } from './enum/inputTestIdEnum';
import { BoxInput, TitleInput } from './input.styles';

export interface InputProps extends InputPropsAntd {
  titulo?: string;
  margin?: string;
}

const Input = ({ titulo, margin, ...props }: InputProps) => {
  return (
    <BoxInput data-testid={InputTestIdEnum.BOX_INPUT} style={{ margin }}>
      {titulo && <TitleInput data-testid={InputTestIdEnum.INPUT_TITLE}>{titulo}</TitleInput>}
      <InputAntd {...props} />
    </BoxInput>
  );
};

export default Input;

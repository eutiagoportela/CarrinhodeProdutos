import { ButtonProps } from 'antd';
import React from 'react';

import { ButtonAntd } from './button.styles';

interface ButtonCurrentProps extends ButtonProps {
  margin?: string;
}

const Button = ({ margin, ...props }: ButtonCurrentProps) => {
  return <ButtonAntd style={{ margin }} {...props} />;
};

export default Button;

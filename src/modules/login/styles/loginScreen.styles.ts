import styled from 'styled-components';

export const BackgroundImage = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  object-fit: cover;
  z-index: 1;
`;

export const LogoImage = styled.img`
  z-index: 1;
`;

export const ContainerLogin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d9d9d9;
  position: absolute;
  padding: 22px;
  width: 100%;
  height: 100vh;
  max-width: 646px;
  right: 0;
  top: 0;
  z-index: 2;
`;

export const LimitedContainer = styled.div`
  width: 100%;
  max-width: 498px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

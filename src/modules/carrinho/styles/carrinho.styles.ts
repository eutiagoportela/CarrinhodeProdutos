import styled from 'styled-components';

export const ContainerItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Item = styled.div`
  width: 300px;
  margin-bottom: 20px;
`;

export const Figure = styled.figure`
  margin-bottom: 10px;
`;

export const Img = styled.img`
  width: 100%;
  height: auto;
`;

export const InfoProduct = styled.div`
  text-align: center;
`;

export const H2 = styled.h2`
  margin-bottom: 5px;
`;

export const Price = styled.p`
  font-weight: bold;
`;

export const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 5px 10px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

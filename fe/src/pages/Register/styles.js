import styled from 'styled-components';

export const Container = styled.div`

`;

export const Card = styled.div`
  display: flex;
  width: 100%;
  height: 350px;
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.background};
  align-items: center;
  flex-direction: column;
  h2{
    margin-bottom: 16px;
  }
  button {
    margin-top: 24px;
    width: 100%;
  }
`;

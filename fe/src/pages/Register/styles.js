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
    margin-bottom: 4px;
  }
  span {
    margin-bottom: 8px;
  }
  a{
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary.main};
    transition: all 0.2s ease-in;

  &:hover{
    color : ${({ theme }) => theme.colors.primary.light};
  }
  }
  button {
    margin-top: 24px;
    width: 100%;
  }
`;

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  form{
    width: 100%;
  }

  h2{
    margin-bottom: 4px;
  }
  span{
    margin-bottom: 16px;
  }
  a{
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary.main};
    transition: all 0.2s ease-in;

    &:hover{
      color : ${({ theme }) => theme.colors.primary.light};
    }
  }
  button{
    margin-top: 24px;
    width: 100%;
  }
`;

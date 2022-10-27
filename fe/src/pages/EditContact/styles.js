import styled from 'styled-components';

export const CategoryContainer = styled.div`
display: flex;
margin-bottom: 16px;
 a{
    font-size: 16px;
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
    font-weight: bold;
    border: 2px solid ${({ theme }) => theme.colors.primary.main};
    padding: 8px 16px;
    border-radius: 4px;
    transition: all 0.2s ease-in;
    &:hover{
      background : ${({ theme }) => theme.colors.primary.main};
      color:white;
    }
  }
`;

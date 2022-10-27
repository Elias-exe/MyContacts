import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  input{
    margin-top: 15px;
    margin-bottom: 15px;
    width: 100%;
    height: 50px;
    background: white;
    border: none;
    border-radius: 25px;
    box-shadow:(8px 4px 10px rgba(0,0,0, 0.40));
    outline: 0;
    padding: 0 16px;

  &::placeholder{
    color: #BCBCBC;
  }
}
`;

export const Header = styled.div`
display: flex;
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

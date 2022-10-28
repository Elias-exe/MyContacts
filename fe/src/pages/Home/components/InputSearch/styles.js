import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  input{
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

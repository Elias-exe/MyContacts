import styled, { css } from 'styled-components';

export default styled.input`
  width: 100%;
  border: none;
  background: white;
  height: 52px;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.04);
  border-radius: 4px;
  border: 2px solid white;
  outline: none;
  padding: 0 16px;
  font-size: 16px;
  transition: border-color 0.2s ease-in;
  appearance: none;

  &+&{
    margin-top: 16px;
  }

  &:focus{
    border-color:${({ theme }) => theme.colors.primary.main};
  }

  ${({ theme, error }) => error && css`
    color: ${theme.colors.danger.main};
    border-color: ${theme.colors.danger.main} !important;
  `}
`;

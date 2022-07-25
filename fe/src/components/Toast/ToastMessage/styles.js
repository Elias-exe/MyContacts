import styled, { css } from 'styled-components';

const containerVariants = {
  default: css`
    background-color: ${({ theme }) => theme.colors.primary.main};
  `,
  danger: css`
    background-color: ${({ theme }) => theme.colors.danger.main};
  `,
  sucess: css`
  background-color: ${({ theme }) => theme.colors.sucess.main};
  `,
};

export const Container = styled.div`
  color: white;
  padding: 16px 32px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &+&{
    margin-top: 12px;
  }

  img{
    margin-right: 8px;
  }

  ${({ type }) => containerVariants[type] || containerVariants.default}
`;

import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  &+&{
    margin-top: 16px;
  }

  small{
    margin-top: 8px;
    color: ${({ theme }) => theme.colors.danger.main};
    font-size: 12px;
    display: block;
  }

  .form-item{
    position: relative;
    .loader{
      position: absolute;
      top:45px;
      right:16px;
    }
  }
`;

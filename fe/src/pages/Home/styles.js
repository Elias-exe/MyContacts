import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 32px;
  position: relative;
`;

export const ListHeader = styled.header`
  margin-top: 24px;
  margin-bottom: 8px;

  button{
  border: none;
  background: transparent;
  display: flex;
  align-items: center;

span{
  margin-right: 8px;
  font-weight: bold;
  color:${({ theme }) => theme.colors.primary.main};
}
img{
    transform: ${({ orderBy }) => (orderBy === 'desc' ? 'rotate(180deg)' : 'rotate(0deg)')};
    transition: transform 0.2s ease-in;
  }
}
`;

export const Card = styled.div`
  background: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;

  & + &{
    margin-top: 16px;
  }
  .info{
    .contact-name{
      display: flex;
      align-items: center;
    }

    small{
      background: ${({ theme }) => theme.colors.primary.lighter};
      color: ${({ theme }) => theme.colors.primary.main};
      font-weight: bold;
      text-transform: uppercase;
      padding: 4px;
      border-radius: 4px;
      margin-left: 8px;
    }

    span{
      display: block;
      font-size: 14px;
      color: ${({ theme }) => theme.colors.gray[200]}
    }
  }

  .actions{
    display: flex;
    justify-content: center;
    button{
      background: transparent;
      border: none;
      margin-left: 8px;
    }
  }
`;

export const ErrorContainer = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;

.details{
  margin-left: 24px;
}

strong{
  font-size: 22px;
  color: ${({ theme }) => theme.colors.danger.main};
  display: block;
  margin-bottom: 8px;
}

`;

export const EmptyListContainer = styled.div`
  margin-top: 16px;
  display:flex;
  flex-direction: column;
  align-items: center;
p{
  color:${({ theme }) => theme.colors.gray[200]};
  margin-top: 8px;
  text-align: center;
}

strong{
  color:${({ theme }) => theme.colors.primary.main}
}
`;

export const SearchNotFoundContainer = styled.div`
display: flex;
align-items: flex-start;
margin-top: 16px;

p{
  margin-left: 24px;
  color: ${({ theme }) => theme.colors.gray[200]};
  word-break: break-word;
}
`;

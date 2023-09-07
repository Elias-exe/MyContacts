import { useContext } from 'react';
import { Context } from '../../../../Context/AuthContext';

import { Container } from './styles';
import emptybox from '../../../../assets/images/empty-box.svg';
import Loader from '../../../../components/Loader';

/* eslint-disable react/jsx-one-expression-per-line */
export default function EmptyList() {
  const { loading } = useContext(Context);
  return (
    <Container>
      <Loader isLoading={loading} />
      <img src={emptybox} alt="Empty Box" />
      <p>
        Você ainda não tem nenhum contato cadastrado!
        Clique no botão <strong>”Novo contato”</strong> à cima para
        cadastrar o seu primeiro!
      </p>
    </Container>
  );
}

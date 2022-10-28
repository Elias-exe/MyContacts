import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { Container } from './styles';

export default function Header({ hasError, qtyContacts, qtyFilteredContacts }) {
  const aligment = (
    // eslint-disable-next-line no-nested-ternary
    hasError
      ? 'flex-end'
      : (
        qtyContacts > 0
          ? 'space-between'
          : 'center'
      )
  );
  return (
    <Container
      justifyContent={aligment}
    >
      {(!hasError && qtyContacts > 0) && (
      <strong>
        {qtyFilteredContacts}
        {qtyFilteredContacts === 1 ? ' contato' : ' contatos'}
      </strong>
      )}
      <Link to="/new">Novo contato</Link>
    </Container>
  );
}

Header.propTypes = {
  hasError: PropTypes.bool.isRequired,
  qtyContacts: PropTypes.number.isRequired,
  qtyFilteredContacts: PropTypes.number.isRequired,
};

import PropTypes from 'prop-types';

import { Container } from './styles';
import arrow from '../../../../assets/images/icons/arrow.svg';

export default function ListHeader({ orderBy, onToggleOrderBy }) {
  return (
    <Container orderBy={orderBy}>
      <button type="button" onClick={onToggleOrderBy}>
        <span>Nome</span>
        <img src={arrow} alt="Arrow" />
      </button>
    </Container>
  );
}

ListHeader.propTypes = {
  orderBy: PropTypes.string.isRequired,
  onToggleOrderBy: PropTypes.func.isRequired,
};

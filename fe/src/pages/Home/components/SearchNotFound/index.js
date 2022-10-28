import PropTypes from 'prop-types';

import magnifierQuestion from '../../../../assets/images/magnifier-question.svg';

import { Container } from './styles';

/* eslint-disable react/jsx-one-expression-per-line */
export default function SearchNotFound({ searchTerm }) {
  return (
    <Container>
      <img src={magnifierQuestion} alt="Magnifier Question" />
      <p>Nenhum resultado foi encontrado para <strong>{searchTerm}</strong></p>
    </Container>
  );
}

SearchNotFound.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};

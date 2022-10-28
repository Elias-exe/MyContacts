import PropTypes from 'prop-types';

import { Container } from './styles';

export default function InputSearch({ value, change }) {
  return (
    <Container>
      <input
        value={value}
        type="text"
        placeholder="Pesquise pelo nome"
        onChange={change}
      />
    </Container>
  );
}

InputSearch.propTypes = {
  value: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
};

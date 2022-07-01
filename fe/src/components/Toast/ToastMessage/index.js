import PropTypes from 'prop-types';

import xcircle from '../../../assets/images/icons/x-circle.svg';
import checkCircle from '../../../assets/images/icons/check-circle.svg';
import { Container } from './styles';

export default function ToastMessage({ text, type }) {
  return (
    <Container type={type}>
      {type === 'danger' && <img src={xcircle} alt="Erro" />}
      {type === 'sucess' && <img src={checkCircle} alt="Sucess" />}
      <strong>{text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['default', 'sucess', 'danger']),
};

ToastMessage.defaultProps = {
  type: 'default',
};

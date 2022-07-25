import PropTypes from 'prop-types';

import xcircle from '../../../assets/images/icons/x-circle.svg';
import checkCircle from '../../../assets/images/icons/check-circle.svg';
import { Container } from './styles';

export default function ToastMessage({ message, onRemoveMessage }) {
  function handleRemoveToast() {
    onRemoveMessage(message.id);
  }
  return (
    <Container tabIndex={0} role="button" onClick={handleRemoveToast} type={message.type}>
      {message.type === 'danger' && <img src={xcircle} alt="Erro" />}
      {message.type === 'sucess' && <img src={checkCircle} alt="Sucess" />}
      <strong>{message.text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default', 'sucess', 'danger']),
    id: PropTypes.number.isRequired,
  }).isRequired,

  onRemoveMessage: PropTypes.func.isRequired,
};

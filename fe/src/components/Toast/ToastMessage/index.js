import PropTypes from 'prop-types';

import { useEffect } from 'react';
import xcircle from '../../../assets/images/icons/x-circle.svg';
import checkCircle from '../../../assets/images/icons/check-circle.svg';
import { Container } from './styles';

export default function ToastMessage({
  message, onRemoveMessage, isLeaving, animatedRef,
}) {
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 7000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [onRemoveMessage, message]);

  function handleRemoveToast() {
    onRemoveMessage(message.id);
  }

  return (
    <Container
      tabIndex={0}
      role="button"
      onClick={handleRemoveToast}
      type={message.type}
      isLeaving={isLeaving}
      ref={animatedRef}
    >
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
    duration: PropTypes.number,
  }).isRequired,

  onRemoveMessage: PropTypes.func.isRequired,
  isLeaving: PropTypes.bool.isRequired,
  animatedRef: PropTypes.shape().isRequired,
};

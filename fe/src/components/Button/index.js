import PropTypes from 'prop-types';
import Spinner from '../Spinner';

import { StyledButton } from './styles';

export default function Button({
  type, disabled, isLoading, children, danger,
}) {
  return (
    <StyledButton type={type} disabled={disabled || isLoading} danger={danger}>
      {!isLoading && children}
      {isLoading && <Spinner size={16} />}

    </StyledButton>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired,
  danger: PropTypes.bool,
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  isLoading: false,
  danger: false,
};

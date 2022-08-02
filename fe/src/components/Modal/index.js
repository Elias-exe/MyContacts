/* eslint-disable react/jsx-one-expression-per-line */
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Overlay, Container, Footer } from './styles';
import Button from '../Button';

export default function Modal({
  danger,
  title,
  children,
  cancelLabel,
  deleteLabel,
  onCancelButton,
  onDeleteButton,
}) {
  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>{title} </h1>

        <div className="modal-body">
          {children}
        </div>

        <Footer>
          <button type="button" className="cancelButton" onClick={onCancelButton}>
            {cancelLabel}
          </button>
          <Button danger type="button" onClick={onDeleteButton}>
            {deleteLabel}
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById('modal-root'),
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  cancelLabel: PropTypes.string,
  deleteLabel: PropTypes.string,
  onCancelButton: PropTypes.func.isRequired,
  onDeleteButton: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  danger: false,
  cancelLabel: 'Cancelar',
  deleteLabel: 'Deletar',
};

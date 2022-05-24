/* eslint-disable react/jsx-one-expression-per-line */
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Overlay, Container, Footer } from './styles';
import Button from '../Button';

export default function Modal({ danger }) {
  function refreshPage() {
    window.location.reload();
  }

  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>Tem certeza que deseja excluir </h1>
        <p>
          Esta ação não pode ser desfeita!
        </p>
        <Footer>
          <button type="button" className="cancelButton" onClick={refreshPage}>
            Cancelar
          </button>
          <Button danger type="button">
            Deletar
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById('modal-root'),
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
};

Modal.defaultProps = {
  danger: false,
};

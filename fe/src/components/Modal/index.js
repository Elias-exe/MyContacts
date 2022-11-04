/* eslint-disable react/jsx-one-expression-per-line */
import PropTypes from 'prop-types';
import { Overlay, Container, Footer } from './styles';
import Button from '../Button';
import ReactPortal from '../ReactPortal';
import useAnimatedUnmount from '../../hooks/useAnimatedUnmout';

export default function Modal({
  danger,
  isDeleteModalIsVisible,
  isLoadingDeleteContact,
  title,
  children,
  cancelLabel,
  deleteLabel,
  onCancelButton,
  onDeleteButton,
}) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(isDeleteModalIsVisible);
  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId="modal-root">
      <Overlay isLeaving={!isDeleteModalIsVisible} ref={animatedElementRef}>
        <Container danger={danger} isLeaving={!isDeleteModalIsVisible}>
          <h1>{title} </h1>

          <div className="modal-body">
            {children}
          </div>

          <Footer>
            <button type="button" className="cancelButton" onClick={onCancelButton} disabled={isLoadingDeleteContact}>
              {cancelLabel}
            </button>
            <Button danger type="button" onClick={onDeleteButton} isLoading={isLoadingDeleteContact}>
              {deleteLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
  isLoadingDeleteContact: PropTypes.bool,
  isDeleteModalIsVisible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  cancelLabel: PropTypes.string,
  deleteLabel: PropTypes.string,
  onCancelButton: PropTypes.func.isRequired,
  onDeleteButton: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  danger: false,
  isLoadingDeleteContact: false,
  cancelLabel: 'Cancelar',
  deleteLabel: 'Deletar',
};

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import Loader from '../../components/Loader';

import { CategoryContainer } from './styles';

export default function Presentation({
  isLoading,
  contactName,
  contactFormRef,
  onSubmit,
}) {
  return (
    <>
      <Loader isLoading={isLoading} />
      <PageHeader
        title={isLoading ? 'Carregando...' : `Editar ${contactName}`}
      />
      <CategoryContainer>
        <Link to="/newCategory">Nova Categoria</Link>
      </CategoryContainer>
      <ContactForm
        ref={contactFormRef}
        onSubmit={onSubmit}
        buttonLabel="Salvar alterações"
      />
    </>
  );
}

Presentation.propTypes = {
  isLoading: PropTypes.string.isRequired,
  contactName: PropTypes.string.isRequired,
  contactFormRef: PropTypes.shape().isRequired,
  onSubmit: PropTypes.func.isRequired,
};

import { Link } from 'react-router-dom';
import useEditContact from './useEditContact';

import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import Loader from '../../components/Loader';

import { CategoryContainer } from './styles';

export default function EditContact() {
  const {
    isLoading,
    contactName,
    contactFormRef,
    handleSubmit,
  } = useEditContact();

  return (
    <>
      {isLoading && (
        <Loader isLoading={isLoading} />
      )}

      <PageHeader
        title={isLoading ? 'Carregando...' : `Editar ${contactName}`}
      />
      <CategoryContainer>
        <Link to="/newCategory">Nova Categoria</Link>
      </CategoryContainer>
      <ContactForm
        ref={contactFormRef}
        onSubmit={handleSubmit}
        buttonLabel="Salvar alterações"
      />
    </>
  );
}

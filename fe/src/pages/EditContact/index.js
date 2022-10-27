import { useEffect, useState, useRef } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import ContactsService from '../../services/ContactsService';
import ContactForm from '../../components/ContactForm';
import PageHeader from '../../components/PageHeader';
import Loader from '../../components/Loader';
import toast from '../../utils/toast';
import { CategoryContainer } from './styles';

export default function EditContact() {
  const [contactName, setContactName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const contactFormRef = useRef(null);
  const params = useParams();
  const history = useHistory();

  async function handleSubmit(contact) {
    try {
      const updateContactData = await ContactsService.editContact(params.id, contact);

      setContactName(updateContactData.name);
      toast({
        type: 'sucess',
        text: 'Sucesso ao cadastrar o contato',
        duration: 3000,
      });
    } catch {
      toast(
        {
          type: 'danger',
          text: 'Ocorreu um erro ao cadastrar o contato',
        },
      );
    }
  }

  useEffect(() => {
    async function loadContact() {
      try {
        const contactData = await ContactsService.getContactById(params.id);

        contactFormRef.current.setFieldsValue(contactData);

        setIsLoading(false);

        setContactName(contactData.name);
      } catch {
        history.push('/');
        toast({
          type: 'danger',
          text: 'Contato não encontrado!',
        });
      }
    }
    loadContact();
  }, [history, params]);

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
        onSubmit={handleSubmit}
        buttonLabel="Salvar alterações"
      />
    </>
  );
}

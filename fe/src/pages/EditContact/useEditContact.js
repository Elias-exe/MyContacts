import { useEffect, useState, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function useEditContact() {
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

  return {
    isLoading,
    contactName,
    contactFormRef,
    handleSubmit,
  };
}

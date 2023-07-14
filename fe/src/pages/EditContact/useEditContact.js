import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';

import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function useEditContact() {
  const [contactName, setContactName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const contactFormRef = useRef(null);
  const params = useParams();
  const navigate = useNavigate();
  const safeAsyncAction = useSafeAsyncAction();

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
    const controller = new AbortController();
    async function loadContact() {
      try {
        const contactData = await ContactsService.getContactById(params.id, controller.signal);

        safeAsyncAction(() => {
          contactFormRef.current.setFieldsValue(contactData);
          setIsLoading(false);
          setContactName(contactData.name);
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
        safeAsyncAction(() => {
          navigate('/', { replace: true });
          toast({
            type: 'danger',
            text: 'Contato não encontrado!',
          });
        });
      }
    }
    loadContact();

    return () => {
      controller.abort();
    };
  }, [params, safeAsyncAction]);

  return {
    isLoading,
    contactName,
    contactFormRef,
    handleSubmit,
  };
}

import {
  useEffect, useState, useCallback, useMemo, useDeferredValue,
} from 'react';

import jwtDecode from 'jwt-decode';
import toast from '../../utils/toast';

import ContactsService from '../../services/ContactsService';

export default function useHome() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalIsVisible, setIsDeleteModalIsVisible] = useState(false);
  const [contactBeingDelete, setContactBeingDelete] = useState(null);
  const [isLoadingDeleteContact, setIsLoadingDeleteContact] = useState(false);
  const [userData, setUserData] = useState();

  const deferredSearchTerm = useDeferredValue(searchTerm);

  const filteredContacts = useMemo(() => contacts.filter(
    (contact) => (
      contact.name.toLowerCase().includes(deferredSearchTerm.toLowerCase())
    ),
  ), [contacts, deferredSearchTerm]);

  const loadContacts = useCallback(async (signal) => {
    try {
      const body = {
        createdBy: userData?.email,
      };
      const contactsList = await ContactsService.listContacts(
        orderBy,
        signal,
        body,
      );
      setHasError(false);
      setContacts(contactsList);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }
      setHasError(true);
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy, userData?.email]);

  useEffect(() => {
    const controller = new AbortController();

    loadContacts();

    return () => {
      controller.abort();
    };
  }, [loadContacts]);

  let token = null;
  useEffect(() => {
    try {
      token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token);
        setUserData(decodedToken);
      }
    } catch (error) {
      console.error('Erro ao processar o token:', error);
      // Lide com o erro de acordo com suas necessidades, por exemplo,
      // limpando o localStorage ou mostrando uma mensagem de erro.
    }
  }, [token]); // Dependência token, o efeito será executado sempre que 'token' mudar

  const handleToggleOrderBy = useCallback(() => {
    setOrderBy(
      (prevState) => (prevState === 'asc' ? 'desc' : 'asc'),
    );
  }, []);

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  function handleVisibleDeleteModal(contact) {
    setContactBeingDelete(contact);
    setIsDeleteModalIsVisible(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalIsVisible(false);
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDeleteContact(true);

      await ContactsService.deleteContact(contactBeingDelete.id);

      setContacts((prevState) => prevState.filter(
        (contact) => contact.id !== contactBeingDelete.id,
      ));

      toast({
        type: 'sucess',
        text: 'Contato deletado com sucesso!',
      });

      handleCloseDeleteModal();
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletar o contato',
      });
    } finally {
      setIsLoadingDeleteContact(false);
    }
  }

  return {
    isLoadingDeleteContact,
    isDeleteModalIsVisible,
    contactBeingDelete,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    isLoading,
    contacts,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    filteredContacts,
    handleTryAgain,
    orderBy,
    handleToggleOrderBy,
    handleVisibleDeleteModal,
  };
}

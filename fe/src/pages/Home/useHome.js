import {
  useEffect, useState, useCallback, useMemo, useDeferredValue,
} from 'react';

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

  const deferredSearchTerm = useDeferredValue(searchTerm);

  const filteredContacts = useMemo(() => contacts.filter(
    (contact) => (
      contact.name.toLowerCase().includes(deferredSearchTerm.toLowerCase())
    ),
  ), [contacts, deferredSearchTerm]);

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.listContacts(orderBy);
      setHasError(false);
      setContacts(contactsList);
    } catch {
      setHasError(true);
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

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

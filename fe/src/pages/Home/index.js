/* eslint-disable react/jsx-one-expression-per-line */
import { Container } from './styles';

import Loader from '../../components/Loader';
import Modal from '../../components/Modal';

import useHome from './useHome';

import InputSearch from './components/InputSearch';
import Header from './components/Header';
import Error from './components/Error';
import EmptyList from './components/EmptyList';
import SearchNotFound from './components/SearchNotFound';
import ListHeader from './components/ListHeader';
import ContactsList from './components/ContactsList';

export default function Home() {
  const {
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
  } = useHome();

  return (
    <Container>
      <Loader isLoading={isLoading} />
      {contacts.length > 0 && (
        <InputSearch
          value={searchTerm}
          change={handleChangeSearchTerm}
        />
      )}

      <Header
        qtyContacts={contacts.length}
        qtyFilteredContacts={filteredContacts.length}
        hasError={hasError}
      />

      {hasError && (
      <Error onTryAgain={handleTryAgain} />
      )}

      {!hasError && (
      <>
        {(contacts.length < 1 && !isLoading) && (
          <EmptyList />
        )}

        {(contacts.length > 0 && filteredContacts.length < 1) && (
          <SearchNotFound searchTerm={searchTerm} />
        )}

        {filteredContacts.length > 0 && (
        <ListHeader orderBy={orderBy} onToggleOrderBy={handleToggleOrderBy} />
        )}

        {filteredContacts.map((contact) => (
          <ContactsList
            key={contact.id}
            contact={contact}
            onVisibleDeleteModal={handleVisibleDeleteModal}
          />
        ))}
      </>
      )}
      <Modal
        danger
        isLoadingDeleteContact={isLoadingDeleteContact}
        isDeleteModalIsVisible={isDeleteModalIsVisible}
        title={`Tem certeza que deseja remover o contato "${contactBeingDelete?.name}"`}
        onCancelButton={handleCloseDeleteModal}
        onDeleteButton={handleConfirmDeleteContact}
      >
        <p>Essa ação não pode ser desfeita!</p>
      </Modal>
    </Container>
  );
}

/* eslint-disable react/jsx-one-expression-per-line */
import { Link } from 'react-router-dom';

import {
  Container, Header, ListHeader, Card, InputSearchContainer, ErrorContainer,
  EmptyListContainer, SearchNotFoundContainer,
} from './styles';

import Loader from '../../components/Loader';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/sad.svg';
import emptybox from '../../assets/images/empty-box.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';
import useHome from './useHome';

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

      <Loader isLoading={isLoading} />
      {contacts.length > 0 && (
        <InputSearchContainer>
          <input
            value={searchTerm}
            type="text"
            placeholder="Pesquise pelo nome"
            onChange={handleChangeSearchTerm}
          />
        </InputSearchContainer>
      )}

      <Header
        justifyContent={(
          // eslint-disable-next-line no-nested-ternary
          hasError
            ? 'flex-end'
            : (
              contacts.length > 0
                ? 'space-between'
                : 'center'
            )
        )}
      >
        {(!hasError && contacts.length > 0) && (
          <strong>
            {filteredContacts.length}
            {filteredContacts.length === 1 ? ' contato' : ' contatos'}
          </strong>
        )}
        <Link to="/new">Novo contato</Link>
      </Header>

      {hasError && (
      <ErrorContainer>
        <img src={sad} alt="Sad" />
        <div className="details">
          <strong>Ocorreu um erro ao obter os seus contatos!</strong>
          <Button type="button" onClick={handleTryAgain}>
            Tentar novamente
          </Button>
        </div>
      </ErrorContainer>
      )}

      {!hasError && (
      <>
        {(contacts.length < 1 && !isLoading) && (
          <EmptyListContainer>
            <img src={emptybox} alt="Empty Box" />
            <p>
              Você ainda não tem nenhum contato cadastrado!
              Clique no botão <strong>”Novo contato”</strong> à cima para
              cadastrar o seu primeiro!
            </p>
          </EmptyListContainer>
        )}

        {(contacts.length > 0 && filteredContacts.length < 1) && (
          <SearchNotFoundContainer>
            <img src={magnifierQuestion} alt="Magnifier Question" />
            <p>Nenhum resultado foi encontrado para <strong>{searchTerm}</strong></p>
          </SearchNotFoundContainer>
        )}

        {filteredContacts.length > 0 && (
        <ListHeader orderBy={orderBy}>
          <button type="button" onClick={handleToggleOrderBy}>
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </ListHeader>
        )}

        {filteredContacts.map((contact) => (
          <Card key={contact.id}>
            <div className="info">
              <div className="contact-name">
                <strong>{contact.name}</strong>
                {contact.category.name && (
                <small>{contact.category.name}</small>
                )}
              </div>
              <span>{contact.email}</span>
              <span>{contact.phone}</span>
            </div>

            <div className="actions">
              <Link to={`/edit/${contact.id}`}>
                <img src={edit} alt="Edit" />
              </Link>
              <button
                type="button"
                onClick={() => handleVisibleDeleteModal(contact)}
              >
                <img src={trash} alt="Delete" />
              </button>
            </div>
          </Card>
        ))}
      </>
      )}
    </Container>
  );
}

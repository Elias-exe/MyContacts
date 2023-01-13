import PropTypes from 'prop-types';

import { memo } from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';
import edit from '../../../../assets/images/icons/edit.svg';
import trash from '../../../../assets/images/icons/trash.svg';

function ContactsList({
  contact, onVisibleDeleteModal,
}) {
  return (
    <Container key={contact.id}>
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
          onClick={() => onVisibleDeleteModal(contact)}
        >
          <img src={trash} alt="Delete" />
        </button>
      </div>
    </Container>
  );
}

ContactsList.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    phone: PropTypes.string,
    category: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  onVisibleDeleteModal: PropTypes.func.isRequired,
};

export default memo(ContactsList);

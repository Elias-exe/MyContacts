import { TbLogout2 } from 'react-icons/tb';
import { useContext, useState } from 'react';
import Modal from '../Modal';
import { Container } from './styles';
import { Context } from '../../Context/AuthContext';
import logo from '../../assets/images/logo.svg';

export default function Header() {
  const { authenticated, handleLogout } = useContext(Context);
  const [isDeleteModalIsVisible, setIsDeleteModalIsVisible] = useState(false);

  function handleVisibleDeleteModal() {
    setIsDeleteModalIsVisible(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalIsVisible(false);
  }

  function handleLogoutAndCloseModal() {
    handleLogout();
    handleCloseDeleteModal();
  }
  return (
    <Container>
      <img src={logo} alt="MyContacts" width="201" />
      {authenticated ? (
        <div className="logoutContainer">
          <button onClick={handleVisibleDeleteModal} type="button">
            <TbLogout2 size={30} color="red" />
          </button>
        </div>
      ) : null}
      <Modal
        danger
        isDeleteModalIsVisible={isDeleteModalIsVisible}
        title="Tem certeza que deseja sair?"
        deleteLabel="Sair"
        onCancelButton={handleCloseDeleteModal}
        onDeleteButton={handleLogoutAndCloseModal}
      />
    </Container>
  );
}

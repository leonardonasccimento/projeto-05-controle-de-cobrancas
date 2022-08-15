import { useEffect, useState } from 'react';
import ArrowHeader from '../../assets/arrow-header.svg';
import useGlobalContext from '../../hooks/useGlobalContext';
import ModalEditUser from '../ModalEditUser';
import ModalLoadImage from '../ModalLoadImage';
import ModalPopup from '../ModalPopup';
import './styles.css';

function Header() {
  const {
    user,
    handleUpdateUser 
  } = useGlobalContext();
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalLoadImage, setOpenModalLoadImage] = useState(false);

  const togglePopup = () => setOpenModal(!openModal);

  useEffect(() => {
    handleUpdateUser();
  });

  return (
    <header>
      <h2>Resumo de cobranças</h2>
      <div className="container-sign-out">
        <div className="profile-area">
          <div
            onClick={() => setOpenModalLoadImage(true)}
            style={{
              backgroundImage: `url(${user.imagem_url})`,
            }}
            className="profile-icon centered-image"
          >
            {!user.imagem_url && user.nome.slice(0, 2).toUpperCase()}
          </div>
          <strong>{user.nome}</strong>
        </div>
        <img
          className="arrow-options"
          src={ArrowHeader}
          alt="header options"
          onClick={togglePopup}
        />

        {openModal && (
          <ModalPopup
            openModalEdit={openModalEdit}
            setOpenModal={setOpenModal}
            setOpenModalEdit={setOpenModalEdit}
          />
        )}

        {openModalEdit && (
          <ModalEditUser
            openModalEdit={openModalEdit}
            setOpenModalEdit={setOpenModalEdit}
          />
        )}

        {openModalLoadImage && (
          <ModalLoadImage
            openModalLoadImage={openModalLoadImage}
            setOpenModalLoadImage={setOpenModalLoadImage}
          />
        )}
      </div>
    </header>
  );
}

export default Header;
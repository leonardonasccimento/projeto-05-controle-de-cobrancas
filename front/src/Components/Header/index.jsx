import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowHeader from '../../assets/arrow-header.svg';
import IconEdit from '../../assets/icon-edit.svg';
import IconExit from '../../assets/icon-exit.svg';
import useGlobalContext from '../../hooks/useGlobalContext';
import api from '../../services/api';
import Modal from '../Modal';
import './styles.css';

function Header() {
  const navigate = useNavigate();
  const {
    token,
    user,
    usersArray,
    setUser,
    setUsersArray,
    clearToken,
    clearUser,
    clearCurrentCustomer,
    clearCurrentCharge } = useGlobalContext();
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  async function handleLoadUsersArray() {
    try {
      const response = await api.get("/usuario", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status > 204) {
        return;
      }

      setUsersArray([...response.data]);
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  async function handleUpdateUser() {
    try {
      const response = await api.get("/usuario", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status > 204) {
        return;
      }

      setUsersArray([...response.data]);

      const userFound = usersArray.filter((object) => object.id === user.id);

      setUser(userFound[0]);
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  const togglePopup = () => setModal(!modal);

  const toggleModal = () => {
    setModal(false);
    setModalEdit(!modalEdit);
  };

  const editUser = async () => setModalEdit(false);

  async function handleExitHome(e) {
    e.stopPropagation();
    clearToken();
    clearUser();
    clearCurrentCustomer();
    clearCurrentCharge();
    navigate("/");
  }

  useEffect(() => {
    handleLoadUsersArray();
  });

  return (
    <header>
      <h2>Resumo de cobranças</h2>

      <div className="container-sign-out">
        <div className="profile-area">
          <div className="profile-icon">
            {user.nome.slice(0, 2).toUpperCase()}
          </div>
          <strong>{user.nome}</strong>
        </div>

        <img
          className="arrow-options"
          src={ArrowHeader}
          alt="header options"
          onClick={togglePopup}
        />

        {modal && (
          <div className="popup">
            <div className="popup-button" onClick={toggleModal}>
              <img src={IconEdit} alt="edit" />
              <span>Editar</span>
            </div>
            <div className="popup-button" onClick={handleExitHome}>
              <img src={IconExit} alt="exit" />
              <span>Sair</span>
            </div>
          </div>
        )}

        {modalEdit && (
            <Modal
              toggleModal={toggleModal}
              applyModal={editUser}
              handleUpdateUser={handleUpdateUser}
              modalEdit={modalEdit}
              setModalEdit={setModalEdit}
            />
        )}
      </div>
    </header>
  );
}

export default Header;
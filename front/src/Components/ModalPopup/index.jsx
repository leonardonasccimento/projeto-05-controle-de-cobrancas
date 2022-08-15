import { useNavigate } from 'react-router-dom';
import IconEdit from '../../assets/icon-edit.svg';
import IconExit from '../../assets/icon-exit.svg';
import useGlobalContext from '../../hooks/useGlobalContext';
import { clearAll } from '../../utils/localStorage';
import './styles.css';

function ModalPopup({
  openModalEdit,
  setOpenModal, 
  setOpenModalEdit
  }){
  const navigate = useNavigate();
  const { 
    clearToken, 
    clearUser, 
    clearCurrentCustomer, 
    clearCurrentCharge 
  } = useGlobalContext();

  const toggleModal = () => {
    setOpenModal(false);
    setOpenModalEdit(!openModalEdit);
  };

  async function handleExitHome(e) {
    e.stopPropagation();
    clearToken();
    clearUser();
    clearCurrentCustomer();
    clearCurrentCharge();
    clearAll();
    navigate("/");
  }

  return (
    <div className="popup">
      <div className="popup-button" onClick={() => toggleModal()}>
        <img src={IconEdit} alt="edit" />
        <span>Editar</span>
      </div>
      <div className="popup-button" onClick={(e) => handleExitHome(e)}>
        <img src={IconExit} alt="exit" />
        <span>Sair</span>
      </div>
    </div>
  );
}

export default ModalPopup;
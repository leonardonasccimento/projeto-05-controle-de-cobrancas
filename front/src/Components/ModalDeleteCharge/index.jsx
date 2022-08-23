import AtentionIcon from '../../assets/atention-icon.svg';
import CloseIcon from '../../assets/close-icon.svg';
import useGlobalContext from '../../hooks/useGlobalContext.js';
import api from '../../services/api';
import './styles.css';

function ModalDeleteCharge({ openModalDeleteCharge, handleClose }) {
  const { token, currentCharge } = useGlobalContext();

  async function handleDeleteCharge(e) {
    e.preventDefault();

    if (currentCharge.status === "pago" || currentCharge.status === "vencido") {
      alert("Cobranças com status pago ou vencido não podem ser excluídas.");
      return;
    }

    try {
      const response = await api.delete(`/cobranca/${currentCharge.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status > 204) {
        return;
      }

      alert("Cobrança excluída com sucesso!");
    } catch (error) {
      alert(error);
      window.location.reload();
    }
  }

  return (
    <>
      {openModalDeleteCharge && (
        <div className="backdrop">
          <div className="modal-container mod-modal-container-delete">
            <img
              className="close-icon"
              src={CloseIcon}
              alt="close icon"
              onClick={handleClose}
            />
            <img
              className="atention-icon"
              alt="atention icon"
              src={AtentionIcon}
            />
            <div className="container-no-yes">
              <strong>Tem certeza que deseja excluir esta cobrança?</strong>
              <div className="btns-no-yes">
                <button type="submit" onClick={handleDeleteCharge}>
                  Sim
                </button>
                <button type="button" onClick={handleClose}>
                  Não
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalDeleteCharge;
import Charges from '../../assets/charges.svg';
import CloseIcon from '../../assets/close-icon.svg';
import useGlobalContext from '../../hooks/useGlobalContext.js';
import './styles.css';

function ModalDetailCharge({ openModalDetailCharge, handleClose }) {
  const { currentCharge } = useGlobalContext();

  return (
    <>
      {openModalDetailCharge && (
        <div className="backdrop">
          <div className="modal-container mod-modal-container mod2-modal-container">
            <img
              className="close-icon"
              src={CloseIcon}
              alt="close icon"
              onClick={handleClose}
            />
            <div className="modal-Details">
              <div className="header-customers-icon margin">
                <img src={Charges} alt="customers icon" />
                <h2>Detalhe da Cobrança</h2>
              </div>
              <div className="nunito-14 item-span">
                Nome
                <span>{currentCharge.cliente}</span>
              </div>
              <div className="nunito-14  item-span">
                Descrição
                <span className='description-style'>{currentCharge.descricao}</span>
              </div>
              <div className="container-dueDate-value">
                <div className="nunito-14 item-span">
                  Vencimento
                  <span>{`${(new Date(currentCharge.vencimento)).toLocaleDateString()}`}</span>
                </div>
                <div className="nunito-14 item-span">
                  Valor
                  <span>{`R$ ${currentCharge.valor.toFixed(2)}`}</span>
                </div>
              </div>
              <div className="container-dueDate-value">
                <div className=" item-span">
                  ID Cobranças
                  <span>{currentCharge.id}</span>
                </div>
                <div className=" item-span">
                  Status
                  <span
                    className={
                      (currentCharge.status==="pago" && "status-color in-day") ||
                      (currentCharge.status==="vencido" && "status-color defaulter") ||
                      (currentCharge.status==="pendente" && "status-color in-day-pending")
                    }
                  >{currentCharge.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalDetailCharge;
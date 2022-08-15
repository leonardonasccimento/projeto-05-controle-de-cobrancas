import CloseIcon from '../../assets/close-icon.svg';
import useGlobalContext from '../../hooks/useGlobalContext';
import api from '../../services/api';
import './styles.css';

function ModalDeleteImage({setOpenModalDeleteImage}){
  const { token, user } = useGlobalContext();

  async function handleDeleteImage(e) {
    e.preventDefault();

    if (!user.imagem_nome) {
      return;
    }

    try {
      const response = await api.post("/usuario/excluir", {
        nome: user.imagem_nome,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status > 204) {
        return;
      }

      setOpenModalDeleteImage(false);
    } catch (error) {
      alert(error);
    }
  }

    return(
        <div className="popup mod-popup">
            <img 
              src={CloseIcon} 
              alt='Icone fechar'
              onClick={()=>setOpenModalDeleteImage(false)}
            />
            <h3 className='title-delete'>Excluir imagem de perfil?</h3>
            <div className="btns-no-yes mod-btns-no-yes">
              <button type='submit' onClick={(e)=>handleDeleteImage(e)}>Sim</button>
              <button type='button' onClick={()=>setOpenModalDeleteImage(false)}>Não</button>
            </div>
        </div>
    );
}

export default ModalDeleteImage;
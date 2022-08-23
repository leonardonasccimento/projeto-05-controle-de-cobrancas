import sizeof from 'object-sizeof';
import { useEffect, useState } from 'react';
import CloseIcon from '../../assets/close-icon.svg';
import ImageDelete from '../../assets/delete-image.svg';
import useGlobalContext from '../../hooks/useGlobalContext';
import api from '../../services/api';
import Input from '../Input';
import ModalDeleteImage from '../ModalDeleteImage';
import './styles.css';

function ModalLoadImage({setOpenModalLoadImage}){
  const { 
    token, 
    user
  } = useGlobalContext();
  const [namePicture, setNamePicture] = useState('');
  const [newPicture, setNewPicture] = useState('');
  const [isBase64, setIsBase64] = useState(false);
  const [openModalDeleteImage, setOpenModalDeleteImage] = useState(false);
  const {handleUpdateUser} = useGlobalContext();

  const handleProfile = (e) => {
    const file = e.target.files[0];
    setNamePicture(file.name);
    const reader = new FileReader();
    reader.addEventListener("load",() => {
      let readerResult=reader.result.slice(reader.result.indexOf('base64,')+7, reader.result.length);
      setNewPicture(readerResult);
      setIsBase64(window.btoa(window.atob(readerResult))===readerResult);
    },
    false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  
  async function handleUploadImage(e) {
    e.preventDefault();

    if(sizeof(newPicture)>13981013){
      alert("O arquivo deve ter o tamanho máximo de aproximadamente 5mb");
      return;
    }

    if(!newPicture){
      alert("O arquivo selecionado não é uma imagem.");
      return;
    }

    if(!isBase64){
      alert("O arquivo selecionado não é uma imagem.");
      return;
    }

    try {
      const response = await api.post("/usuario/carregar", {
        nome: namePicture,
        imagem: newPicture,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status > 204) {
        return;
      }

      alert("Carregamento bem sucedido!");
    } catch (error) {
      alert(error);
      window.location.reload();
    }
  }

  useEffect(()=>{
    handleUpdateUser();
  }, [user, handleUpdateUser]);

  return (
    <>
      <div className="backdrop">
        <div className="modal-container">
          <img
            src={CloseIcon}
            alt="close icon"
            onClick={() => setOpenModalLoadImage(false)}
          />
          <form
            className="modal-form"
            onSubmit={(e) => handleUploadImage(e)}
          >
            <div
              style={{
                alignItems: "center",
              }}
              className="modal-edit-input"
            >
              <h2
                style={{
                  width: "100%",
                }}
              >
                Mudar imagem de perfil
              </h2>
              <div
                style={{
                  backgroundImage: `url(${user.imagem_url})`,
                  width: "7.6rem",
                  height: "7.6rem",
                  cursor: "default",
                }}
                className="profile-icon centered-image"
              >
                {!user.imagem_url && user.nome.slice(0, 2).toUpperCase()}
                <img
                  className="delete-icon"
                  style={{
                    position: "absolute",
                    right: "-1.5rem",
                    top: "-1rem",
                  }}
                  src={ImageDelete}
                  alt="excluir cobranca"
                  onClick={() => setOpenModalDeleteImage(true)}
                />
              </div>
              <label className="nunito-14" htmlFor="imagem">
                Carregar uma imagem:
                <Input
                  type="file"
                  name="imagem"
                  handleOnChange={(e) => handleProfile(e)}
                  accept="image/*"
                  required
                />
              </label>
            </div>
            <button
              className="btn-pink btn-apply"
              type="submit"
            >
              Aplicar
            </button>
          </form>

          {openModalDeleteImage && (
            <ModalDeleteImage
              setOpenModalDeleteImage={setOpenModalDeleteImage}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default ModalLoadImage;


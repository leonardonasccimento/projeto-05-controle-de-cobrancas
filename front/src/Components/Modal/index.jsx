import { useEffect, useState } from 'react';
import CloseIcon from '../../assets/close-icon.svg';
import useGlobalContext from '../../hooks/useGlobalContext';
import api from '../../services/api';
import Input from '../Input';
import './styles.css';

function Modal({
  toggleModal,
  handleUpdateUser,
  modalEdit,
  }){
    
  const { token, user, usersArray} = useGlobalContext();

  const [nameEdit, setNameEdit] = useState("");
  const [emailEdit, setEmailEdit] = useState("");
  const [cpfEdit, setCpfEdit] = useState("");
  const [phoneEdit, setPhoneEdit] = useState("");
  const [passwordEdit, setPasswordEdit] = useState("");
  const [passwordEditConfirmed, setPasswordEditConfirmed] = useState("");

  useEffect(()=>{
    if(modalEdit){
      setNameEdit(user.nome);
      setEmailEdit(user.email);
      setCpfEdit(user.cpf);
      setPhoneEdit(user.telefone);
    }

  },[modalEdit, user.nome, user.email, user.cpf, user.telefone]);

  function handleReset() {
    setNameEdit("");
    setEmailEdit("");
    setCpfEdit("");
    setPhoneEdit("");
    setPasswordEdit("");
    setPasswordEditConfirmed("");
  }

  async function handleSubmitEditedUser(e) {
    e.preventDefault();

    const emailDouble = usersArray.some((object) => object.email === emailEdit);
    if (emailDouble) {
      if (emailEdit !== user.email) {
        alert("Este E-mail já foi cadastrado.");
        return;
      }
    }

    if (cpfEdit) {
      if (cpfEdit.length !== 11) {
        alert("O CPF deve ter 11 caracteres.");
        return;
      }
    }

    const cpfDouble = usersArray.some((object) => object.cpf === cpfEdit);
    if (cpfDouble) {
      if (cpfEdit !== user.cpf) {
        alert("Este CPF já foi cadastrado.");
        return;
      }
    }

    if(phoneEdit){
      if (phoneEdit.length > 11) {
        alert("O Telefone deve ter no máximo 11 caracteres.");
        return;
      }
    }

    if (passwordEdit !== passwordEditConfirmed) {
      alert("As senhas não conferem.");
      return;
    }

    try {
      const response = await api.put("/usuario", {
        nome: nameEdit,
        email: emailEdit,
        cpf: cpfEdit,
        telefone: phoneEdit,
        senha: passwordEdit,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status > 204) {
        return;
      }

      alert("Usuário editado com sucesso!");
      handleReset();
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  handleUpdateUser();

  return (
    <>
    <div className="backdrop">
      <div className="modal-container">
        <img src={CloseIcon} alt="close icon" onClick={toggleModal} />
        <form
          className="modal-form"
          onSubmit={(e) => handleSubmitEditedUser(e)}
        >
          <div className="modal-edit-input">
            <h2>Edite seu cadastro</h2>
            <label className="nunito-14" htmlFor="nome">
              Nome*
              <Input
                placeholder="Digite seu nome"
                type="text"
                name="nome"
                value={nameEdit}
                handleOnChange={(e) => setNameEdit(e.target.value)}
                required
              />
            </label>

            <label className="nunito-14" htmlFor="nome">
              E-mail*
              <Input
                placeholder="Digite seu e-mail"
                type="email"
                name="email"
                value={emailEdit}
                handleOnChange={(e) => setEmailEdit(e.target.value)}
                required
              />
            </label>

            <div className="modal-edit-row">
              <label className="nunito-14" htmlFor="nome">
                CPF
                <Input
                  placeholder="Digite seu CPF"
                  type="text"
                  name="cpf"
                  value={cpfEdit}
                  handleOnChange={(e) => setCpfEdit(e.target.value)}
                />
              </label>

              <label className="nunito-14" htmlFor="nome">
                Telefone
                <Input
                  placeholder="Digite seu Telefone"
                  type="text"
                  name="telefone"
                  value={phoneEdit}
                  handleOnChange={(e) => setPhoneEdit(e.target.value)}
                />
              </label>
            </div>

            <label className="nunito-14" htmlFor="nome">
              Nova Senha*
              <Input
                placeholder="*********"
                type="password"
                name="senha"
                required
                value={passwordEdit}
                handleOnChange={(e) => setPasswordEdit(e.target.value)}
              />
            </label>

            <label className="nunito-14" htmlFor="nome">
              Confirmar Senha*
              <Input
                placeholder="*********"
                type="password"
                name="senhaConfirmada"
                required
                value={passwordEditConfirmed}
                handleOnChange={(e) => setPasswordEditConfirmed(e.target.value)}
              />
            </label>
          </div>
          <button
            className="btn-pink btn-apply"
            type="submit"
            onClick={() => handleUpdateUser()}
          >
            Aplicar
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default Modal;


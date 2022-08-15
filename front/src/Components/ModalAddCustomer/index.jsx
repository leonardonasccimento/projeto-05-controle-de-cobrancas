import { useState } from 'react';
import CloseIcon from '../../assets/close-icon.svg';
import CustomersIcon from '../../assets/customers.svg';
import useGlobalContext from '../../hooks/useGlobalContext.js';
import api from '../../services/api';
import './styles.css';

function ModalAddCustomer({ openModalAddCustomer, handleClose }) {
  const { 
    token, 
    customersArray
  } = useGlobalContext();

  const [formCustomer, setFormCustomer]=useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    complement: '',
    district: '',
    city: '',
    state: ''
  });

  function handleChangeFormValues(e){
    setFormCustomer({...formCustomer,
      [e.target.name]: e.target.value,
    });
  }

  function handleClear() {
    setFormCustomer({
      name: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
      complement: '',
      district: '',
      city: '',
      state: ''
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formCustomer.name || !formCustomer.email || !formCustomer.cpf || !formCustomer.phone) {
      alert("Informe todos os campos obrigatórios.");
      return;
    }

    if (formCustomer.cpf.length !== 11) {
      alert("CPF deve conter 11 dígitos.");
      return;
    }

    if (formCustomer.cpf.includes('e') || formCustomer.cpf.includes('E') || formCustomer.cpf.includes('.')) {
      alert("O campo CPF deve conter apenas números.");
      return;
    }

    const emailDouble = customersArray.some((object) => object.email === formCustomer.email);
    if (emailDouble) {
      alert("Este E-mail já foi cadastrado.");
      return;
    }

    const cpfDouble = customersArray.some((object) => object.cpf === formCustomer.cpf);
    if (cpfDouble) {
      alert("Este CPF já foi cadastrado.");
      return;
    }

    if (formCustomer.phone.length > 11) {
      alert("O telefone deve ter o máximo de 11 caracteres");
      return;
    }

    if (formCustomer.phone.includes('e') || formCustomer.phone.includes('E') || formCustomer.phone.includes('.')) {
      alert("O campo Telefone deve conter apenas números.");
      return;
    }
   
    if(formCustomer.cep){
      if (formCustomer.cep.length > 8) {
        alert("O CEP deve ter o máximo de 8 caracteres");
        return;
      }

      if (formCustomer.cep.includes('e') || formCustomer.cep.includes('E') || formCustomer.cep.includes('.')) {
        alert("O campo CEP deve conter apenas números.");
        return;
      }
    }

    try {
      const response = await api.post("/cliente", {
        nome: formCustomer.name,
        email: formCustomer.email,
        cpf: formCustomer.cpf,
        telefone: formCustomer.phone,
        cep: formCustomer.cep,
        logradouro: formCustomer.address,
        complemento: formCustomer.complement,
        bairro: formCustomer.district,
        cidade: formCustomer.city,
        estado: formCustomer.state,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status > 204) {
        return;
      }

      alert("Cliente registrado com sucesso!");
      handleClear();
    } catch (error) {
      alert(error);
    }
  }

  return (
    <>
      {openModalAddCustomer && (
        <div className="backdrop">
          <div className="modal-container">
            <img
              className="close-icon"
              src={CloseIcon}
              alt="close icon"
              onClick={handleClose}
            />
            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="modal-edit-input">
                <div className="header-customers-icon">
                  <img src={CustomersIcon} alt="customers icon" />
                  <h2>Cadastro do Cliente</h2>
                </div>
                <label className="nunito-14">
                  Nome*
                  <input
                    placeholder="Digite o nome"
                    type="text"
                    name="name"
                    value={formCustomer.name}
                    onChange={(e) => handleChangeFormValues(e)}
                    required
                  />
                </label>
                <label className="nunito-14">
                  E-mail*
                  <input
                    placeholder="Digite o e-mail"
                    type="email"
                    name="email"
                    value={formCustomer.email}
                    onChange={(e) => handleChangeFormValues(e)}
                    required
                  />
                </label>
                <div className="modal-edit-row">
                  <label className="nunito-14">
                    CPF*
                    <input
                      placeholder="Apenas números"
                      type="number"
                      name="cpf"
                      value={formCustomer.cpf}
                      onChange={(e) => handleChangeFormValues(e)}
                      required
                    />
                  </label>
                  <label className="nunito-14">
                    Telefone*
                    <input
                      placeholder="Apenas números"
                      type="number"
                      name="phone"
                      value={formCustomer.phone}
                      onChange={(e) => handleChangeFormValues(e)}
                      required
                    />
                  </label>
                </div>
                <label className="nunito-14">
                  Endereço
                  <input
                    placeholder="Digite o endereço"
                    type="text"
                    name="address"
                    value={formCustomer.address}
                    onChange={(e) => handleChangeFormValues(e)}
                  />
                </label>
                <label className="nunito-14">
                  Complemento
                  <input
                    placeholder="Digite o complemento"
                    type="text"
                    name="complement"
                    value={formCustomer.complement}
                    onChange={(e) => handleChangeFormValues(e)}
                  />
                </label>
                <div className="modal-edit-row">
                  <label className="nunito-14">
                    CEP
                    <input
                      placeholder="Apenas números"
                      type="number"
                      name="cep"
                      value={formCustomer.cep}
                      onChange={(e) => handleChangeFormValues(e)}
                    />
                  </label>
                  <label className="nunito-14">
                    Bairro
                    <input
                      placeholder="Digite o bairro"
                      type="text"
                      name="district"
                      value={formCustomer.district}
                      onChange={(e) => handleChangeFormValues(e)}
                    />
                  </label>
                </div>
                <div className="modal-edit-row">
                  <label className="nunito-14">
                    Cidade
                    <input
                      placeholder="Digite a cidade"
                      type="text"
                      name="city"
                      value={formCustomer.city}
                      onChange={(e) => handleChangeFormValues(e)}
                    />
                  </label>
                  <label className="nunito-14 align-label-select">
                    UF
                    <select
                      name="state"
                      onChange={(e) => handleChangeFormValues(e)}
                    >
                      <option defaultValue="">Nenhum</option>
                      <option value="AC">AC</option>
                      <option value="AL">AL</option>
                      <option value="AM">AM</option>
                      <option value="AP">AP</option>
                      <option value="BA">BA</option>
                      <option value="CE">CE</option>
                      <option value="DF">DF</option>
                      <option value="ES">ES</option>
                      <option value="GO">GO</option>
                      <option value="MA">MA</option>
                      <option value="MG">MG</option>
                      <option value="MS">MS</option>
                      <option value="MT">MT</option>
                      <option value="PA">PA</option>
                      <option value="PB">PB</option>
                      <option value="PE">PE</option>
                      <option value="PI">PI</option>
                      <option value="PR">PR</option>
                      <option value="RJ">RJ</option>
                      <option value="RN">RN</option>
                      <option value="RO">RO</option>
                      <option value="RR">RR</option>
                      <option value="RS">RS</option>
                      <option value="SC">SC</option>
                      <option value="SE">SE</option>
                      <option value="SP">SP</option>
                      <option value="TO">TO</option>
                    </select>
                  </label>
                </div>
              </div>
              <div className="btn-modal-customers">
                <button className="btn-cancel" onClick={() => handleClear()}>
                  Cancelar
                </button>
                <button type="submit" className="btn-pink">
                  Aplicar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalAddCustomer;
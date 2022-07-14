import { useState } from 'react';
import CloseIcon from '../../assets/close-icon.svg';
import CustomersIcon from '../../assets/customers.svg';
import useGlobalContext from '../../hooks/useGlobalContext.js';
import api from '../../services/api';
import './styles.css';

function ModalCustomers({ open, handleClose }) {
  const { 
    token, 
    customersArray} = useGlobalContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [complement, setComplement] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  function handleClear() {
    setName("");
    setEmail("");
    setCpf("");
    setPhone("");
    setCep("");
    setAddress("");
    setComplement("");
    setDistrict("");
    setCity("");
    setState("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name || !email || !cpf || !phone) {
      alert("Informe todos os campos obrigatórios.");
      return;
    }

    if (cpf.length !== 11) {
      alert("CPF deve conter 11 dígitos.");
      return;
    }

    if(`${parseInt(cpf)}`.length !== `${Number(cpf)}`.length){
      alert("O campo CPF deve conter apenas números.");
      return;
    }

    const emailDouble = customersArray.some((object) => object.email === email);
    if (emailDouble) {
      alert("Este E-mail já foi cadastrado.");
      return;
    }

    const cpfDouble = customersArray.some((object) => object.cpf === cpf);
    if (cpfDouble) {
      alert("Este CPF já foi cadastrado.");
      return;
    }

    if (phone.length > 11) {
      alert("O telefone deve ter o máximo de 11 caracteres");
      return;
    }

    if(`${parseInt(phone)}`.length !== `${Number(phone)}`.length){
      alert("O campo Telefone deve conter apenas números.");
      return;
    }
   
    if(cep){
      if (cep.length > 8) {
        alert("O CEP deve ter o máximo de 8 caracteres");
        return;
      }
  
      if(`${parseInt(cep)}`.length !== `${Number(cep)}`.length){
        alert("O campo CEP deve conter apenas números.");
        return;
      }
    }

    try {
      const response = await api.post("/cliente", {
        nome: name,
        email,
        cpf,
        telefone: phone,
        cep,
        logradouro: address,
        complemento: complement,
        bairro: district,
        cidade: city,
        estado: state,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status > 204) {
        return;
      }

      alert("Cliente registrado com sucesso!");
      // setCustomersArray([...response.data]);
    } catch (error) {
      alert(error.response.data.mensage);
    }
  }

  return (
    <>
      {open && (
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </label>
                <label
                  className="nunito-14"
                  //   htmlFor="email"
                >
                  E-mail*
                  <input
                    placeholder="Digite o e-mail"
                    type="email"
                    // name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
                <div className="modal-edit-row">
                  <label className="nunito-14">
                    CPF*
                    <input
                      placeholder="Apenas números"
                      type="number"
                      value={cpf}
                      onChange={(e) => setCpf(e.target.value)}
                      required
                    />
                  </label>
                  <label className="nunito-14">
                    Telefone*
                    <input
                      placeholder="Apenas números"
                      type="number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <label className="nunito-14">
                  Endereço
                  <input
                    placeholder="Digite o endereço"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </label>
                <label className="nunito-14">
                  Complemento
                  <input
                    placeholder="Digite o complemento"
                    type="text"
                    value={complement}
                    onChange={(e) => setComplement(e.target.value)}
                  />
                </label>
                <div className="modal-edit-row">
                  <label className="nunito-14">
                    CEP
                    <input
                      placeholder="Apenas números"
                      type="number"
                      value={cep}
                      onChange={(e) => setCep(e.target.value)}
                    />
                  </label>
                  <label className="nunito-14">
                    Bairro
                    <input
                      placeholder="Digite o bairro"
                      type="text"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                    />
                  </label>
                </div>
                <div className="modal-edit-row">
                  <label className="nunito-14">
                    Cidade
                    <input
                      placeholder="Digite a cidade"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </label>

                  <label className="nunito-14 align-label-select">
                    UF
                    <select 
                      onChange={(e) => setState(e.target.value)}
                    >
                      <option value="" selected>Nenhum</option>
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

export default ModalCustomers;
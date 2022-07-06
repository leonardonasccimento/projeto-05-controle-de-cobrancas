import { useState } from 'react';
import CloseIcon from '../../assets/close-icon.svg';
import CustomersIcon from '../../assets/customers.svg';
import useGlobalContext from '../../hooks/useGlobalContext.js';
import api from '../../services/api';
import './styles.css';

function ModalCustomers({ open, handleClose }) {
  const { token, customers, setCustomers } = useGlobalContext();

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

    const emailDouble = customers.some((object) => object.email === email);
    if (emailDouble) {
      alert("Este E-mail já foi cadastrado.");
      return;
    }

    const cpfDouble = customers.some((object) => object.cpf === cpf);
    if (cpfDouble) {
      alert("Este CPF já foi cadastrado.");
      return;
    }

    if (phone.length > 11) {
      alert("O telefone deve ter o máximo de 11 caracteres");
      return;
    }

    if(cep){
      if (cep.length > 8) {
        alert("O CEP deve ter o máximo de 8 caracteres");
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
      handleClear();
      setCustomers([...response.data]);
    } catch (error) {
      return error.response.data.mensage;
    }
  }

  function handleReloadPage(e) {
    e.stopPropagation();
    // window.location.reload();
  }

  return (
    <>
      {open && (
        <div className="backdrop">
          <div className="modal-container">
            <div onClick={(e) => handleReloadPage(e)}>
              <img
                className="close-icon"
                src={CloseIcon}
                alt="close icon"
                onClick={handleClose}
              />
            </div>
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
                      placeholder="Digite o CPF"
                      type="number"
                      value={cpf}
                      onChange={(e) => setCpf(e.target.value)}
                      required
                    />
                  </label>
                  <label className="nunito-14">
                    Telefone*
                    <input
                      placeholder="Digite o telefone"
                      type="text"
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
                      placeholder="Digite o CEP"
                      type="text"
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

                  <label className="nunito-14">
                    UF
                    <input
                      placeholder="Digite a UF"
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
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
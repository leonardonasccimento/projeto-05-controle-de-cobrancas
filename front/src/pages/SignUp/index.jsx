import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterSuccess from '../../assets/img-success.svg';
import CustomStepper from '../../Components/CustomStepper/index';
import Input from '../../Components/Input';
import useGlobalContext from '../../hooks/useGlobalContext';
import api from '../../services/api';
import './styles.css';

function SignUp() {
  const navigate = useNavigate();
  const {
    usersArray,
    setUsersArray}=useGlobalContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [activeStep, setActiveStep] = useState({
    firstSection: true,
    secondSection: false,
    thirdSection: false,
  });

  async function handleUsers() {
    try {
      const response = await api.get("/usuario");

      if (response.status > 204) {
        return;
      }

      setUsersArray([...response.data]);
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  useEffect(()=>{
    if(email!==''){
      handleUsers();
    }
  });

  function nextFirstSection() {
    const emailDouble = usersArray.some((object) => object.email === email);
    if (emailDouble) {
        alert("Este E-mail já foi cadastrado.");
        return;
    }
    
    setActiveStep({ ...activeStep, secondSection: true });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!password || !confirmPassword) {
      alert("Preencha os campos abaixo");
      return;
    }

    if (password !== confirmPassword) {
      alert("As senhas não conferem");
      return;
    }

    setActiveStep({ ...activeStep, thirdSection: true });

    if (password !== confirmPassword) {
      alert("As senhas não conferem");
      return;
    }

    if (!name || !email || !password || !confirmPassword) {
      alert("Preencha todos os campos");
      return;
    }

    const user = {
      nome: name,
      email: email,
      senha: password,
    };

    try {
      const response=await api.post("usuario", user);

      if (response.status > 204) {
        return;
      }

      alert("usuario cadastrado " + name);
      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  return (
    <div className="container-sign-up">
      <div className="left-sign-up">
        <CustomStepper activeStep={activeStep} setActiveStep={setActiveStep} />
      </div>
      <div className="right-sign-up">
        {activeStep.firstSection &&
          !activeStep.secondSection &&
          !activeStep.thirdSection && (
            <form className="form-sign-up" onSubmit={nextFirstSection}>
              <h1 className="montserrat-24">Adicione seus dados</h1>
              <div className="name-ipunt-sign-up">
                <label className="nunito-14">Nome*</label>
                <Input
                  placeholder="Digite seu nome"
                  required
                  type="text"
                  value={name}
                  handleOnChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="email-ipunt-sign-up">
                <label className="nunito-14">E-mail*</label>
                <Input
                  placeholder="Digite seu e-mail"
                  required
                  type="email"
                  value={email}
                  handleOnChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                type='submit' 
                className="btn-pink btn"
                onClick={()=>handleUsers()}
              >Continuar</button>
              <span className=".nunito-16">
                Já possui uma conta? Faça seu <Link to="/"> Login</Link>
              </span>
            </form>
          )}

        {activeStep.firstSection &&
          activeStep.secondSection &&
          !activeStep.thirdSection && (
            <form className="form-sign-up" onSubmit={handleSubmit}>
              <h1 className="montserrat-24">Adicione seus dados</h1>
              <div className="name-ipunt-sign-up">
                <label className="nunito-14">Senha*</label>
                <Input
                  placeholder=""
                  type="password"
                  value={password}
                  handleOnChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="email-ipunt-sign-up">
                <label className="nunito-14">Repita a senha*</label>
                <Input
                  placeholder=""
                  type="password"
                  value={confirmPassword}
                  handleOnChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button className="btn-pink btn">Entrar</button>
              <span 
                className="nunito-16"
              >
                Já possui uma conta? Faça seu <Link to="/"> Login</Link>
              </span>
            </form>
          )}

        {activeStep.firstSection &&
          activeStep.secondSection &&
          activeStep.thirdSection && (
            <div className="container-success">
              <div className="box-success">
                <img src={RegisterSuccess} alt="success" />
                <h1 className="montserrat-24">
                  Cadastro realizado com sucesso!
                </h1>
              </div>
              <Link to="/" style={{ textDecoration: "none" }}>
                <button type="button" className="btn-pink btn">
                  Ir para Login
                </button>
              </Link>
            </div>
          )}

        <div className="progress-bar">
          <div
            style={{
              backgroundColor:
                activeStep.firstSection &&
                !activeStep.secondSection &&
                !activeStep.thirdSection
                  ? "#0E8750"
                  : "#DEDEE9",
            }}
          ></div>
          <div
            style={{
              backgroundColor:
                activeStep.firstSection &&
                activeStep.secondSection &&
                !activeStep.thirdSection
                  ? "#0E8750"
                  : "#DEDEE9",
            }}
          ></div>
          <div
            style={{
              backgroundColor:
                activeStep.firstSection &&
                activeStep.secondSection &&
                activeStep.thirdSection
                  ? "#0E8750"
                  : "#DEDEE9",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
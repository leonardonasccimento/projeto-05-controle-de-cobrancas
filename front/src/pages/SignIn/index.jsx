import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../Components/Input';
import useGlobalContext from '../../hooks/useGlobalContext';
import api from '../../services/api';
import './styles.css';

function SignIn() {
  const navigate = useNavigate();

  const { token, setToken, setUser } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("Preencha todos os campos ou cadastre-se.");
      return;
    }

    try {
      const { data } = await api.post("/login", {
        email: email,
        senha: password,
      });

      setUser(data.usuario);
      setToken(data.token);

      navigate("/home");
    } catch (error) {
      alert("Email ou senha invalidos.");
    }
  }

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token, navigate]);

  return (
    <div className="container-sign-in">
      <div className="left-sign-in">
        <h1 className="montserrat-24">
          Gerencie todos os pagamentos da sua empresa em um só lugar.
        </h1>
      </div>

      <div className="right-sign-in">
        <form className="form-sign-in" onSubmit={handleSubmit}>
          <h1 className="montserrat-24">Faça seu login!</h1>
          <div className="email-ipunt-sign-in">
            <label className="nunito-14">E-mail*</label>
            <Input
              placeholder="Digite seu e-mail"
              type="email"
              required
              value={email}
              handleOnChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password-ipunt-sign-in">
            <div className="forgot-password">
              <label className="nunito-14">Senha*</label>
              <span className="nunito-14">
                <Link to="/">Esqueceu a senha?</Link>
              </span>
            </div>

            <Input
              placeholder="Digite sua senha"
              type="password"
              required
              value={password}
              handleOnChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn-pink btn" type="submit">
            Entrar
          </button>
        </form>

        <span className=".nunito-16">
          Ainda não possui uma conta? <Link to="/sign-up"> Cadastre-se</Link>
        </span>
      </div>
    </div>
  );
}

export default SignIn;
import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

import Header from '../../utils/Header';
import './styles.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    let data = {
      username,
      password,
    };
    try {
      let response = await api.post('session', data);
      localStorage.setItem('loginId', response.data.loginid);
      localStorage.setItem('instName', username);

      history.push('/leads');
    } catch (err) {
      alert('Erro na conexão, tente novamente');
    }
  }

  return (
    <div className="login-conteiner">
      <Header />
      <main className="login">
        <div className="heading">
          <span className="blackblock">
            <h1>
              <i>N</i>ext Leads
            </h1>
          </span>
          <h2>
            Visualize todos os Leads <br /> da sua instituição <br /> e torne em
            alunos.
          </h2>
          <br />
        </div>
        <div>
          <form className="loginForm" id="form" onSubmit={handleLogin}>
            <div className="loginItem">
              <input
                className="formInput"
                type="text"
                name="login"
                id="login"
                placeholder="seu Login"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <br />
            <div className="loginItem">
              <input
                className="formInput"
                type="password"
                name="password"
                id="password"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <br />
            <button type="submit" className="startButton" id="postForm">
              Enviar <FiLogIn size={25} color="#333" />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import './styles.css';
import { FiPower, FiPlus, FiX } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import Sidebar from '../../utils/Sidebar';
import api from '../../services/api';
import Darkmode from 'darkmode-js';

const darkmode = new Darkmode();
darkmode.showWidget();

export default function Configurar() {
  const [leads, setLeads] = useState([]);
  const instName = localStorage.getItem('instName');
  const loginId = localStorage.getItem('loginId');
  const history = useHistory();

  function toggleMenu(e) {
    const navlinks = document.querySelector('div.navlinks');
    navlinks.classList.toggle('active');
  }

  if (instName === null || loginId === null) {
    history.push('/');
  }

  useEffect(() => {
    api
      .get('leads', {
        headers: {
          authorization: loginId,
        },
      })
      .then((response) => {
        setLeads(response.data);
      });
  }, [loginId]);

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  function handleEmailAdd(e) {
    e.preventDefault();
    const listEmails = document.getElementById('listEmails');
    const newElement = document.createElement('div');

    const newElementContent =
      '<div class="emailBox"><input id="email" type="email" class="email" placeholder="Email"><button class="buttonEmail">+</button><button class="buttonEmail">-</button></div>';

    newElement.innerHTML = newElementContent.trim();
    newElement.firstChild.children[1].onclick = (e) => {
      handleEmailAdd(e);
    };
    newElement.firstChild.children[2].onclick = (e) => {
      handleEmailDelete(e);
    };
    listEmails.appendChild(newElement.firstChild);
  }

  function handleEmailDelete(e) {
    e.preventDefault();
    e.target.parentElement.remove();
  }
  function handleSendEmail() {
    const emails = document.getElementById('listEmails');
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    const emailsArray = Array();

    for (var i = 0; i < emails.children.length; i++) {
      emailsArray.push(emails.children[i].firstChild.value);
    }

    if (
      (emailsArray.length == 1 && emailsArray[0].length === 0) ||
      subject.length == 0 ||
      message.length == 0
    ) {
      swal(
        'Erro',
        'Complete todos os campos de pelo menos um email, título e mensagem!',
        'error',
      );
    } else {
      const data = { emails: emailsArray, subject, message };
      try {
        api.post('/email', data);
      } catch (err) {
        console.log(err);
      }
    }
  }
  return (
    <div className="email-conteiner">
      <header>
        <nav>
          <Link
            to="#"
            className="toggle-button"
            id="button"
            onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </Link>
          <div className="navlinks">
            <Link to="/">
              <div className="li">Next</div>
            </Link>
          </div>
          <FiPower
            size={30}
            style={{ color: '#333' }}
            className="logout"
            onClick={handleLogout}
          />
        </nav>
      </header>
      <Sidebar />
      <div className="emails" id="emails">
        <div className="listEmails" id="listEmails">
          <div className="emailBox">
            <input
              id="email"
              type="email"
              className="email"
              placeholder="Email"
            />
            <button onClick={(e) => handleEmailAdd(e)} className="buttonEmail">
              +
            </button>
          </div>
        </div>
      </div>
      <div className="messages">
        <input
          type="text"
          placeholder="Título"
          id="subject"
          className="subject"
        />
        <textarea
          id="message"
          className="message"
          placeholder="Corpo do Email"></textarea>
        <button className="send startButton" onClick={handleSendEmail}>
          Enviar
        </button>
      </div>
    </div>
  );
}

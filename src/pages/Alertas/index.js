import React, { useState, useEffect } from 'react';
import './styles.css';
import { FiPower } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import Sidebar from '../../utils/Sidebar';
import api from '../../services/api';
import Darkmode from 'darkmode-js';

const darkmode = new Darkmode();
darkmode.showWidget();

export default function Alertas() {
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

  function convertMS(ms) {
    var d, h, m, s;
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    return d;
  }
  const leadsAlert = Array();

  leads.forEach((lead) => {
    if (lead.reminder > 0) {
      const daysDiff = convertMS(new Date() - new Date(lead.date));
      leadsAlert.push({
        name: lead.name,
        email: lead.email,
        tel: lead.tel,
        days: daysDiff,
        reminder: lead.reminder,
      });
    }
  });

  console.log(leadsAlert);
  return (
    <div class="alertas-conteiner">
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
      <div className="centralize">
        <div className="alertBox">
          {leadsAlert.map((lead) =>
            lead.days >= lead.reminder ? (
              <div className="alertLead">
                <div className="alertInfoBox">
                  <div className="alertInfo">
                    <strong>Nome: </strong>
                    {lead.name}
                  </div>
                  <div className="alertInfo">
                    <strong>Email: </strong>
                    {lead.email}
                  </div>
                  <div className="alertInfo">
                    <strong>Telefone: </strong>
                    {lead.tel}
                  </div>
                </div>
                <div className="alertDetails">
                  passou do seu lembrete de {lead.reminder} dia(s),
                  contabilizando {lead.days} dia(s)
                </div>
              </div>
            ) : null,
          )}
        </div>
      </div>
    </div>
  );
}

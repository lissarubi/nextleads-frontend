import React, { useState, useEffect } from 'react';
import './styles.css';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import Sidebar from '../../utils/Sidebar';
import api from '../../services/api';
import Darkmode from 'darkmode-js';

const darkmode = new Darkmode();
darkmode.showWidget();

export default function Estatisticas() {
  const [leads, setLeads] = useState([]);
  const instName = localStorage.getItem('instName');
  const loginId = localStorage.getItem('loginId');
  const history = useHistory();

  function toggleMenu(e) {
    const navlinks = document.querySelector('div.navlinks');
    navlinks.classList.toggle('active');
  }

  if (instName === undefined || loginId === undefined) {
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

  function getContacted(lead) {
    return lead.contacted === true;
  }

  function getInterested(lead) {
    return lead.interested === true;
  }

  function getMatriculated(lead) {
    return lead.matriculated === true;
  }

  return (
    <div className="Estatisticas-conteiner">
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
      <div className="statistics">
        <div className="statsCard total">
          <h1>Leads Totais</h1>
          <div className="statsNumber">Há {leads.length} Leads</div>
        </div>

        <div className="statsCard contacts">
          <h1>Contactados</h1>
          <div className="statsNumber">
            {leads.length} de {leads.filter(getContacted).length}
          </div>
        </div>

        <div className="statsCard interests">
          <h1>Interesados</h1>
          <div className="statsNumber">
            {leads.length} de {leads.filter(getInterested).length}
          </div>
        </div>

        <div className="statsCard matriculates">
          <h1>Matrículados</h1>
          <div className="statsNumber">
            {leads.length} de {leads.filter(getMatriculated).length}
          </div>
        </div>
      </div>
    </div>
  );
}

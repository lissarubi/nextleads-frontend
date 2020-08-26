import React, { useState, useEffect } from 'react';
import './styles.css';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import Sidebar from '../../utils/Sidebar';
import swal from 'sweetalert';
import api from '../../services/api';
import Darkmode from 'darkmode-js';
const darkmode = new Darkmode();
darkmode.showWidget();

export default function Leads() {
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

  async function handleContacted(leadId, instId) {
    let data = {
      leadId: leadId,
      item: 'contacted',
    };

    try {
      api.put('/changeLeadItem', data, {
        headers: {
          authorization: instId,
        },
      });

      setTimeout(() => {
        window.location.reload(false);
      }, 1000);
    } catch (err) {
      swal('Falha na conexão, tente novamente mais tarde');
    }
  }
  async function handleInterested(leadId, instId) {
    let data = {
      leadId: leadId,
      item: 'interested',
    };

    try {
      api.put('/changeLeadItem', data, {
        headers: {
          authorization: instId,
        },
      });

      setTimeout(() => {
        window.location.reload(false);
      }, 1000);
    } catch (err) {
      swal('Falha na conexão, tente novamente mais tarde');
    }
  }
  async function handleMatriculated(leadId, instId) {
    let data = {
      leadId: leadId,
      item: 'matriculated',
    };

    try {
      api.put('/changeLeadItem', data, {
        headers: {
          authorization: instId,
        },
      });

      setTimeout(() => {
        window.location.reload(false);
      }, 1000);
    } catch (err) {
      swal('Falha na conexão, tente novamente mais tarde ');
    }
  }
  async function handleDelete(leadId, instId) {
    try {
      api.delete(`/leads/${leadId}`, {
        headers: {
          authorization: instId,
        },
      });

      setTimeout(() => {
        window.location.reload(false);
      }, 1000);
    } catch (err) {
      swal('Falha na conexão, tente novamente mais tarde ');
    }
  }
  return (
    <div className="leads-conteiner">
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
      <main>
        <span className="blackblock">
          <h2>Leads</h2>
        </span>
        <div className="leadsBox">
          {leads.map((lead) =>
            lead.contacted === false ? (
              <div className="lead" key={lead.id}>
                <FiTrash2
                  size={25}
                  color="#333"
                  className="deleteLead"
                  onClick={() => handleDelete(lead.id, lead.loginid)}
                />
                <div className="leadItem">{lead.name}</div>
                <div className="leadItem">{lead.email}</div>
                <div className="leadItem">{lead.tel}</div>
                <div className="leadItem">
                  <button
                    className="notContacted"
                    onClick={() => handleContacted(lead.id, lead.loginid)}>
                    Contactar
                  </button>
                </div>
              </div>
            ) : lead.contacted === true &&
              lead.interested === true &&
              lead.matriculated === false ? (
              <div className="lead" key={lead.id}>
                <FiTrash2
                  size={25}
                  color="#333"
                  className="deleteLead"
                  onClick={() => handleDelete(lead.id, lead.loginid)}
                />
                <div className="leadItem">{lead.name}</div>
                <div className="leadItem">{lead.email}</div>
                <div className="leadItem">{lead.tel}</div>
                <div className="leadItem">
                  <button className="contacted">Contactado</button>
                </div>
                <div className="leadItem">
                  <button className="interested">Interessado</button>
                </div>
                <div className="leadItem">
                  <button
                    className="notMatriculated"
                    onClick={() => handleMatriculated(lead.id, lead.loginid)}>
                    Matriculado
                  </button>
                </div>
              </div>
            ) : lead.contacted === true &&
              lead.interested === true &&
              lead.matriculated === true ? (
              <div className="lead" key={lead.id}>
                <FiTrash2
                  size={25}
                  color="#333"
                  className="deleteLead"
                  onClick={() => handleDelete(lead.id, lead.loginid)}
                />
                <div className="leadItem">{lead.name}</div>
                <div className="leadItem">{lead.email}</div>
                <div className="leadItem">{lead.tel}</div>
                <div className="leadItem">
                  <button className="contacted">Contactado</button>
                </div>
                <div className="leadItem">
                  <button className="interested">Interessado</button>
                </div>
                <div className="leadItem">
                  <button className="matriculated">Matriculado</button>
                </div>
              </div>
            ) : lead.contacted === true && lead.interested === true ? (
              <div className="lead" key={lead.id}>
                <FiTrash2
                  size={25}
                  color="#333"
                  className="deleteLead"
                  onClick={() => handleDelete(lead.id, lead.loginid)}
                />
                <div className="leadItem">{lead.name}</div>
                <div className="leadItem">{lead.email}</div>
                <div className="leadItem">{lead.tel}</div>
                <div className="leadItem">
                  <button className="contacted">Contactado</button>
                </div>
                <div className="leadItem">
                  <button className="interested">Interessado</button>
                </div>
              </div>
            ) : lead.contacted == true && lead.interested == false ? (
              <div className="lead" key={lead.id}>
                <FiTrash2
                  size={25}
                  color="#333"
                  className="deleteLead"
                  onClick={() => handleDelete(lead.id, lead.loginid)}
                />
                <div className="leadItem">{lead.name}</div>
                <div className="leadItem">{lead.email}</div>
                <div className="leadItem">{lead.tel}</div>
                <div className="leadItem">
                  <button className="contacted" id={lead.id}>
                    Contactado
                  </button>
                </div>
                <div className="leadItem">
                  <button
                    className="notInterested"
                    id={lead.id}
                    onClick={() => handleInterested(lead.id, lead.loginid)}>
                    Interessado
                  </button>
                </div>
              </div>
            ) : (
              <div>Sem leads</div>
            ),
          )}
        </div>
      </main>
    </div>
  );
}

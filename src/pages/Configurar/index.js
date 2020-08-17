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

  function handleChangeAllDays(e) {
    e.preventDefault();

    const reminder = e.target[0].value;

    const leadInputs = document.querySelectorAll('.leadInput');

    leadInputs.forEach((lead) => {
      lead.childNodes[0].value = reminder;
    });

    function IsReminderSame(lead) {
      return Number(lead.reminder) != Number(reminder);
    }

    const leadsWillModify = leads.filter(IsReminderSame);
    if (leadsWillModify.length != 0) {
      try {
        for (var i = 0; i < leadsWillModify.length; i++) {
          leads[i].reminder = reminder;

          var data = {
            leadId: leadsWillModify[i].id,
            item: 'reminder',
            reminder: reminder,
          };
          api.put('changeLeadItem', data, {
            headers: {
              authorization: leadsWillModify[i].loginid,
            },
          });

          swal(
            'Dados Atualizados!',
            'Os dados foram corretamente atualizados',
            'success',
          );
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      swal(
        'Erro',
        'Dados foram preenchidos com o mesmo valor anterior',
        'error',
      );
    }
  }
  function handleChangeDays(e) {
    e.preventDefault();

    const leadsInput = e.target;
    try {
      for (var i = 0; i < leadsInput.length - 1; i++) {
        leads[i].reminder = leadsInput[i].value;

        var data = {
          leadId: leads[i].id,
          item: 'reminder',
          reminder: leadsInput[i].value,
        };
        api.put('changeLeadItem', data, {
          headers: {
            authorization: leads[i].loginid,
          },
        });
      }
      swal(
        'Dados Atualizados!',
        'Os dados foram corretamente atualizados',
        'success',
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="configurar-conteiner">
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
      <div className="config">
        <form onSubmit={(e) => handleChangeAllDays(e)} className="changeDays">
          <h1>Aplicar alerta de tempo para todos os Leads</h1>
          <input
            id="daysForAll"
            type="number"
            className="inputNumber"
            name="daysForAll"
            min="0"
            max="60"
            placeholder="Dias para alertar"
          />
          <br />
          <button type="submit" className="buttonSubmit">
            Aplicar
          </button>
        </form>
        <form className="changeDays" onSubmit={(e) => handleChangeDays(e)}>
          <h1>Aplicar alerta de tempo para cada Lead individualmaente</h1>
          <div className="leadScroll">
            <div className="leadScrollItem">
              <div>Nome</div>
              <div>Email</div>
              <div>Dias</div>
            </div>
            {leads.map((lead) => {
              return (
                <>
                  <div className="leadScrollItem">
                    <div className="leadName">{lead.name}</div>
                    <div className="leadEmail">{lead.email}</div>
                    <div className="leadInput">
                      <input
                        id=""
                        type="number"
                        name="leadInput"
                        defaultValue={lead.reminder}
                      />
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <button type="submit" className="buttonSubmit">
            Aplicar
          </button>
        </form>
      </div>
    </div>
  );
}

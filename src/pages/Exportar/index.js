import React, { useState, useEffect } from 'react';
import './styles.css';
import moment from 'moment';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import Sidebar from '../../utils/Sidebar';
import swal from 'sweetalert';
import api from '../../services/api';
import Darkmode from 'darkmode-js';

const darkmode = new Darkmode();
darkmode.showWidget();

export default function Exportar() {
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
  function ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str =
      'nome,email,telefone,relembrar,data,contactado,interessado,matriculado\r\n';

    for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
        if (line != '') line += ',';

        line += array[i][index];
      }

      str += line + '\r\n';
    }

    return str;
  }

  function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(text),
    );
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
  const cuttedLeads = Array();

  for (var i = 0; i < leads.length; i++) {
    cuttedLeads.push({
      name: leads[i].name,
      email: leads[i].email,
      tel: leads[i].tel,
      reminder: leads[i].reminder,
      date: moment(new Date(leads[i].date)).locale('pt-br').format('L'),
      contacted: leads[i].contacted == true ? 'sim' : 'não',
      interested: leads[i].interested == true ? 'sim' : 'não',
      matriculated: leads[i].matriculated == true ? 'sim' : 'não',
    });
  }
  console.log(cuttedLeads);
  function handleCSV() {
    const leadsCSV = ConvertToCSV(cuttedLeads);
    download('planilhaLeads.csv', leadsCSV);
    swal(
      'Download Feito!',
      'Todos os leads foram baixados com sucesso!',
      'success',
    );
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
      <div className="exports">
        <strong>Exportar Leads</strong>
        <br />
        <div className="exportItem">
          Exportar para Tabela
          <button type="submit" className="exportButton" onClick={handleCSV}>
            Exportar
          </button>
        </div>
      </div>
    </div>
  );
}

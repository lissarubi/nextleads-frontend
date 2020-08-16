import React from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiTrendingUp, FiSliders } from 'react-icons/fi';

export default function Sidebar() {
  return (
    <div className="sidebar-conteiner">
      <div className="sidebar">
        <Link to="/leads" className="sidebarItem">
          <div>
            <FiUsers size={40} style={{ fill: '#333', color: 'gainsboro' }} />
            <br />
            Leads
          </div>
        </Link>
        <Link to="/estatisticas" className="sidebarItem">
          <div>
            <FiTrendingUp
              size={40}
              style={{ fill: '#333', color: 'gainsboro' }}
            />
            <br />
            Estatísticas
          </div>
        </Link>
        <Link to="/configurar" className="sidebarItem">
          <div>
            <FiSliders size={40} style={{ fill: '#333', color: 'gainsboro' }} />
            <br />
            Configurar
          </div>
        </Link>
      </div>
    </div>
  );
}

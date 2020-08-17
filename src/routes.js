import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Leads from './pages/Leads';
import Form from './pages/Form';
import Thanks from './pages/thanks';
import Estatisticas from './pages/Estatisticas';
import Configurar from './pages/Configurar';
import Alertas from './pages/Alertas';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/leads" component={Leads} />
        <Route path="/form" component={Form} />
        <Route path="/thanks" component={Thanks} />
        <Route path="/estatisticas" component={Estatisticas} />
        <Route path="/configurar" component={Configurar} />
        <Route path="/alertas" component={Alertas} />
      </Switch>
    </BrowserRouter>
  );
}

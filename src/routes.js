import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './pages/Login'
import Leads from './pages/Leads'
import Form from './pages/Form'
import Thanks from './pages/thanks'

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/leads" component={Leads} />
                <Route path="/form" component={Form} />
                <Route path="/thanks" component={Thanks} />
            </Switch>
        </BrowserRouter>
    )
}
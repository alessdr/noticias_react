import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Create from './components/create.component';
import Edit from './components/edit.component';
import Index from './components/index.component';

import {APP_LOGO as LOGO} from './resources/constants'
import {APP_BACKGROUND as BACKGROUND} from './resources/constants'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container" >
          <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-nav">
            <Link to={'/'} className="navbar-brand">
              <img src={LOGO} alt="Logo Notícias"/>
              Notícias
            </Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="nav navbar-nav ml-auto">
                <li className="nav-item active">
                  <Link to={'/'} className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/create'} className="nav-link">Cadastrar</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/index'} className="nav-link">Listar</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-dark my-2 my-sm-0" type="button">Login</button>
                </li>
                
              </ul>
            </div>
          </nav> <br/>
          {/*
          <h2>Bem vindo ao cadastro de notícias</h2><br/>
          */}
          <Switch>
              <Route exact path='/create' component={ Create } />
              <Route path='/edit/:id' component={ Edit } />
              <Route path='/index' component={ Index } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

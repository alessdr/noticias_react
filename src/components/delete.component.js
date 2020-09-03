import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import axios from 'axios';

import { alertService } from '../resources/alert.service';
import {API_URL} from '../resources/constants'
import {ALERT_OPTIONS} from '../resources/constants'

export default class Delete extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: '',
      content: '',
      publish_date:''
    }
  }

  componentDidMount() {
      axios.get(API_URL + '/' + this.props.match.params.id)
          .then(response => {
              this.setState({ 
                title: response.data.title, 
                content: response.data.content,
                publish_date: response.data.publish_date });
          }).catch(error => {
            alertService.error('Erro carregando a notícia.', ALERT_OPTIONS)
            console.log(error)
          })
  }

  onSubmit(e) {
    e.preventDefault();
    axios.delete(API_URL + '/' + this.props.match.params.id)
          .then(response => {
            alertService.success('Notícia excluída com sucesso.', ALERT_OPTIONS)
            console.log('Deleted')
            this.props.history.push('/list');
          })
          .catch(err => {
            alertService.error('Erro excluindo a notícia.', ALERT_OPTIONS)
            console.log(err)
          })
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Deletar Notícia</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Título</label>
                    <input 
                      type="text" 
                      disabled
                      className="form-control"
                      value={this.state.title}
                      />
                </div>
                <div className="form-group">
                    <label>Conteúdo</label>
                    <textarea type="text" 
                      disabled
                      className="form-control"
                      rows="4"
                      value={this.state.content}
                      />
                </div>
                <div className="form-group">
                    <label>Data Publicação</label>
                    <input type="date"
                      disabled
                      className="form-control"
                      value={this.state.publish_date}
                      />
                </div>
                <div className="form-group">
                    <button 
                      onClick={this.delete} 
                      className="btn btn-danger button-margin">
                        Confirmar
                    </button>
                    <Route render={({ history}) => (
                      <button
                        type='button'
                        onClick={() => { history.push('/list') }}
                        className="btn btn-outline-dark">
                          Cancelar
                      </button>
                    )}/>
                </div>
            </form>
        </div>
    )
  }
}
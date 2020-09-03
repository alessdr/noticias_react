import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import axios from 'axios';

import {API_URL} from '../resources/constants'
import {ALERT_OPTIONS} from '../resources/constants'
import { alertService } from '../resources/alert.service';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onChangePublishDate = this.onChangePublishDate.bind(this);
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

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }
  onChangeContent(e) {
    this.setState({
      content: e.target.value
    })  
  }
  onChangePublishDate(e) {
    this.setState({
      publish_date: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      title: this.state.title,
      content: this.state.content,
      publish_date: this.state.publish_date
    };
    axios.put(API_URL + '/' + this.props.match.params.id, obj)
        .then(res => {
          alertService.success('Notícia atualizada com sucesso.', ALERT_OPTIONS)
          console.log('Notícia atualizada com sucesso.', res.data)
          this.props.history.push('/list');
        }).catch(error => {
          alertService.error('Erro atualizando a notícia.', ALERT_OPTIONS)
          console.log(error)
        })
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Alterar Notícia</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group required">
                    <label className="control-label">Título</label>
                    <input 
                      type="text" 
                      className="form-control"
                      required
                      value={this.state.title}
                      onChange={this.onChangeTitle}
                      />
                </div>
                <div className="form-group required">
                    <label className="control-label">Conteúdo</label>
                    <textarea type="text" 
                      className="form-control"
                      rows="4"
                      required
                      value={this.state.content}
                      onChange={this.onChangeContent}
                      />
                </div>
                <div className="form-group required">
                    <label className="control-label">Data Publicação</label>
                    <input type="date"
                      max="9999-12-31" 
                      className="form-control"
                      required
                      value={this.state.publish_date}
                      onChange={this.onChangePublishDate}
                      />
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Salvar" 
                      className="btn btn-primary button-margin"/>
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
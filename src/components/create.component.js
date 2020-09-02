import React, { Component } from 'react';
import axios from 'axios';

import { alertService } from '../resources/alert.service';
import {API_URL} from '../resources/constants'
import {ALERT_OPTIONS} from '../resources/constants'

export default class Create extends Component {
  constructor(props) {
      super(props);
      this.onChangetitle = this.onChangetitle.bind(this);
      this.onChangeContent = this.onChangeContent.bind(this);
      this.onChangePublished = this.onChangePublished.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
          title: '',
          content: '',
          publish_date:''
      }
  }
  onChangetitle(e) {
    this.setState({
      title: e.target.value
    });
  }
  onChangeContent(e) {
    this.setState({
      content: e.target.value
    })  
  }
  onChangePublished(e) {
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

    axios.post(API_URL, obj)
        .then(response => {
          alertService.success('Notícia incluída com sucesso.', ALERT_OPTIONS)
          this.setState({ 
            title: '', 
            content: '',
            publish_date: '' 
          })
        })
        .catch(error => {
            alertService.error('Erro incluindo a notícia.', ALERT_OPTIONS)
            console.log(error)
        })
  }
 
  render() {
      return (
          <div style={{ marginTop: 10 }}>
              <h4>Nova Notícia</h4>
              <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                      <label>Título:  </label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={this.state.title}
                        onChange={this.onChangetitle}
                        />
                  </div>
                  <div className="form-group">
                      <label>Conteúdo: </label>
                      <textarea
                        className="form-control"
                        value={this.state.content}
                        onChange={this.onChangeContent}
                        />
                  </div>
                  <div className="form-group">
                      <label>Data Publicação: </label>
                      <input type="date"
                        max="9999-12-31" 
                        className="form-control"
                        value={this.state.publish_date}
                        onChange={this.onChangePublished}
                        />
                  </div>
                  <div className="form-group">
                      <input type="submit" value="Salvar" className="btn btn-primary"/>
                  </div>
              </form>
          </div>
      )
  }
}
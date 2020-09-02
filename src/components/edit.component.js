import React, { Component } from 'react';
import axios from 'axios';

import {API_URL} from '../resources/constants'

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
          })
          .catch(function (error) {
              console.log(error);
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
        .then(res => console.log(res.data));
    
    this.props.history.push('/index');
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Alterar Notícia</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Título:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.title}
                      onChange={this.onChangeTitle}
                      />
                </div>
                <div className="form-group">
                    <label>Conteúdo: </label>
                    <textarea type="text" 
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
                      onChange={this.onChangePublishDate}
                      />
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Salvar" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}
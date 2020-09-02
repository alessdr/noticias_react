import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';

import {API_URL} from '../resources/constants'

export default class Index extends Component {

  constructor(props) {
      super(props);
      this.state = {noticias: []};
    }
    componentDidMount(){
      axios.get(API_URL)
        .then(response => {
          this.setState({ noticias: response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    tabRow(){
      return this.state.noticias.map(function(object, i){
          return <TableRow obj={object} key={i} />;
      });
    }

    render() {
      return (
        <div>
          <h3 align="center">Notícias</h3>
          <table className="table table-striped table-bordered" style={{ marginTop: 20 }}>
            <thead className="thead-dark">
              <tr>
                <th>Título</th>
                <th>Conteúdo</th>
                <th>Data</th>
                <th colSpan="2">Ações</th>
              </tr>
            </thead>
            <tbody>
              { this.tabRow() }
            </tbody>
          </table>
        </div>
      );
    }
  }
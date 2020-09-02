import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import axios from 'axios';

import { alertService } from '../resources/alert.service';
import {API_URL} from '../resources/constants'
import {ALERT_OPTIONS} from '../resources/constants'

class TableRow extends Component {

  constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    delete() {
      axios.delete(API_URL + '/' + this.props.obj.id)
          .then(response => {
            alertService.success('Notícia excluída com sucesso.', ALERT_OPTIONS)
            console.log('Deleted')
            this.props.history.push('/index');
          })
          .catch(err => {
            alertService.error('Erro excluindo a notícia.', ALERT_OPTIONS)
            console.log(err)
          })
    }
  render() {
    return (
        <tr>
          <td>
            {this.props.obj.title}
          </td>
          <td>
            {this.props.obj.content}
          </td>
          <td>
            <Moment format="DD/MM/YYYY">
              {this.props.obj.publish_date}
            </Moment>
          </td>
          <td>
            <Link to={"/edit/"+this.props.obj.id} className="btn btn-primary">Edit</Link>
          </td>
          <td>
            <button onClick={this.delete} className="btn btn-danger">Delete</button>
          </td>
        </tr>
    );
  }
}

export default TableRow;
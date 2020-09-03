import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

class TableRow extends Component {

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
            <Link to={"/delete/"+this.props.obj.id} className="btn btn-danger">Delete</Link>
          </td>
        </tr>
    );
  }
}

export default TableRow;
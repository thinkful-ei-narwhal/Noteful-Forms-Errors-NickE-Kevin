import React from 'react';
import { Link } from 'react-router-dom';
import Context from './constants/userContext';
import PropTypes from 'prop-types';
export default class Note extends React.Component {
  static contextType = Context;

  render() {
    const { handleDelete } = this.context;
    const date = new Date(this.props.modified);
    const dayOfMonth = date.getUTCDate();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthString = months[date.getMonth()];
    const year = date.getUTCFullYear();
    let dateInHuman = `${dayOfMonth} ${monthString} ${year}`;

    try {
      return (
        <div className="main">
          <div id={this.props.id} className="note-item" >
            <h2>{this.props.title}</h2>
            <Link to={`/note/${this.props.id}`}>Expand Me</Link>
            <p>{dateInHuman}</p>
          </div>
          <button onClick={(e) => handleDelete(this.props.id, this.props.history)}>Delete me!</button>
        </div>
      )
    }
    catch {
      throw new Error('Page failed to load');
    }

  }
}

Note.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  // modified: not including validation for modified b/c both strings and
  // numbers may be passed down and will still be valid
};
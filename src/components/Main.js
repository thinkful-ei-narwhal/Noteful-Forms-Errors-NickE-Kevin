import React from 'react';
import Note from './Note';
import Context from './constants/userContext';
import { Link } from 'react-router-dom';
export default class Main extends React.Component {
  static contextType = Context;

  render() {
    const { notes } = this.context
    let displayNotes = notes.map(note => (
      <Note
        key={note.id}
        id={note.id}
        title={note.name}
        modified={note.modified}
        history={this.props.history}
        />
    ))

    return (
      <div className="main">
        {displayNotes}
        <Link to={'/AddNote'}>
          <button type='button'>Add Note</button>
        </Link>
      </div>
    )
  }
}
import React from 'react';
import { NavLink } from 'react-router-dom';
import Context from './userContext';
export default class Sidebar extends React.Component {
  static contextType = Context;
  render() {
    const { folders } = this.context
    let folderLinks = folders.map(folder => (
      <span key={folder.id} className="nav-item">
        <NavLink to={`/folders/${folder.id}`} activeClassName="selected">
          {folder.name}
        </NavLink>
      </span>
    ))

    return (
      <div className="sidebar">
        <nav>
          {folderLinks}
        </nav>
        <button>Add Folder</button>
      </div>

    )
  }

}
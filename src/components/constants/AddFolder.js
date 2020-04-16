import React from 'react';
import ValidationError from './ValidationError'
import Context from './userContext'

export default class AddFolder extends React.Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: '',
        touched: false
      }
    };
  }

  updateName = (value) => {
    this.setState({ name: { value: value, touched: true } });
  }

  validateName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return 'Name is required';
    } else if (name.length < 3) {
      return 'Name must be at least 3 characters long';
    }
  }

  render() {
    const nameError = this.validateName();
    const { handleNewFolderSubmit } = this.context;
    return (
      <div>
        <h2>Add Folder</h2>
        <form onSubmit={(e) => handleNewFolderSubmit(e, this.state.name.value, this.props.history)} >
          <label htmlFor="folderName"></label>
          <input type="text" onChange={e => this.updateName(e.target.value)} name="folderName" />
          {this.state.name.touched && <ValidationError message={nameError} />}
          <button disabled={this.validateName()}>Add Folder</button>
        </form>
      </div>
    );
  }

}
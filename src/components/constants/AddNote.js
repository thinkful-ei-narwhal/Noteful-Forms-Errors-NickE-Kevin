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
        touched: false,
      },
      content: {
        value: '',
        touched: false,
      },
      folderName: {
        value: '',
        touched: false,
      }
    };
  }

  updateNoteName = (value) => {
    this.setState({ name: { value: value, touched: true } });
  }

  updateNoteCont = (value) => {
    this.setState({ content: { value: value, touched: true } });
  }

  updateNoteFolder = (value) => {
    this.setState({ folderName: { value: value, touched: true } });
  }

  validateNoteName = () => {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return 'Name is required';
    } else if (name.length < 3) {
      return 'Name must be at least 3 characters long';
    }
  }

  validateNoteCont = () => {
    const content = this.state.content.value.trim();
    if (content.length === 0) {
      return 'Content is required';
    } else if (content.length < 3) {
      return 'Content must be at least 3 characters long';
    }
  }

  validateNoteFolder = () => {
    const folderName = this.state.folderName.value.trim();
    if (!folderName) {
      return 'Folder name is required';
    }
  }

  handleSubmitValidation = (e) => {
    e.preventDefault();
    if (this.validateNoteName() || this.validateNoteCont() || this.validateNoteFolder()) {
      this.setState({
        name: {
          value: this.state.name.value,
          touched: true
        },
        content: {
          value: this.state.content.value,
          touched: true
        },
        folderName: {
          value: this.state.folderName.value,
          touched: true
        }
      });
      return;
    }
    this.context.handleNewNoteSubmit(this.state.name.value, this.state.content.value, this.state.folderName.value, this.props.history);
  }

  render() {
    const { folders } = this.context;
    const nameError = this.validateNoteName();
    const contError = this.validateNoteCont();
    const folderError = this.validateNoteFolder();
    return (
      <div>
        <h2>Add Note</h2>
        <form onSubmit={this.handleSubmitValidation}>
          <label htmlFor="noteName">Note Name</label>
          <input type="text" onChange={e => this.updateNoteName(e.target.value)} name="noteName" />
          {this.state.name.touched && <ValidationError message={nameError} />}
          <br />
          <label htmlFor="noteFolder">Folder Name</label>
          <select name="noteFolder" onChange={e => this.updateNoteFolder(e.target.value)} >
            <option>Select a folder</option>
            {folders.map(folder => <option key={folder.id} value={folder.id}>{folder.name}</option>)}
          </select>
          {this.state.folderName.touched && <ValidationError message={folderError} />}
          <br />
          <label htmlFor="noteContent">Note Content</label>
          <input type="text" onChange={e => this.updateNoteCont(e.target.value)} name="noteContent" />
          {this.state.content.touched && <ValidationError message={contError} />}
          <br />
          <button type='submit' >Add Note</button>
        </form>
      </div>
    );
  }
}
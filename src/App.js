import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Main from './components/Main';
import FolderList from './components/FolderList';
import ExpandedNote from './components/ExpandedNote';
import Header from './components/constants/Header';
import Sidebar from './components/constants/Sidebar';
import Context from './components/constants/userContext';
import AddFolder from './components/constants/AddFolder';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "folders": [],
      "notes": []
    }
  }

  componentDidMount() {
    fetch('http://localhost:9090/folders')
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        else {
          throw Error();
        }
      })
      .then(response => this.setState({ folders: response }))
      .catch(err => console.log(err.message));

    fetch('http://localhost:9090/notes')
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        else {
          throw Error();
        }
      })
      .then(response => {
        this.setState({ notes: response });
      }
      )
      .catch(err => console.log(err.message));
  }

  handleDelete = (noteId, history) => {
    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        else {
          throw Error();
        }
      })
      .then(response => {
        this.setState({
          notes: this.state.notes.filter(note => note.id !== noteId)
        })
        history.push('/');
      })
      .catch(err => console.log(err.message));
  }


  handleNewFolderSubmit = (event, newFolderName, history) => {
    event.preventDefault();
    fetch(`http://localhost:9090/folders`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "name": newFolderName })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        else {
          throw Error();
        }
      })
      .then(response => {
        const newFolder = [...this.state.folders, { id: response, name: newFolderName }];
        this.setState({ folders: newFolder });
        history.push('/');
      })
      .catch(err => console.log(err.message));
  }

  render() {
    return (
      <Context.Provider value={{
        folders: this.state.folders,
        notes: this.state.notes,
        handleDelete: this.handleDelete,
        handleNewFolderSubmit: this.handleNewFolderSubmit
      }}>

        <div className="App">
          <Header />
          <div className="flex-divide">
            <Sidebar state={this.state} />
            <Switch>
              <Route
                exact path='/'
                component={Main}
              />
              <Route
                exact path='/folders/:id'
                component={FolderList}
              />

              <Route
                exact path='/note/:id'
                component={ExpandedNote}
              />

              <Route
                exact path='/AddFolder'
                component={AddFolder}
              />

              {/* <Route
                exact path='/AddNote'
                component={AddNote}
              /> */}
            </Switch>
          </div>
        </div>

      </Context.Provider>
    );
  }
}
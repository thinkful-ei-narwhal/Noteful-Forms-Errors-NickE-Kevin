import React from 'react'

export default class ErrorPage extends React.Component {
  state = { error: null, errorInfo: null };

  componentDidCatch(error, errorInfo) {
    console.error(error);
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  render() {
    if (this.state.error) {
      return (
        <main className="error-page">
          <h1>Something seems to have gone wrong</h1>
          <p>Try refreshing the page</p>
        </main>
      );
    }
    return this.props.children;
  }
}
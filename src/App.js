import React from 'react';
import * as api from './services/api';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  state = {
    categories: [],
  };

  async componentDidMount() {
    this.setState({
      categories: await api.getCategories(),
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>Edit src/App.js and save to reload.</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;

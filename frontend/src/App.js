import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

const BACKEND_URL = "http://localhost:8000/"

class App extends Component {
  constructor () {
    super()
    this.state = {
        data: {}
        sort_by_date: false,
        search_episodes: true,
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    axios.get(BACKEND_URL + "search/?q=hi")
        .then(response => this.setState({data: response}))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Listen API Demo</h1>
        </header>
        <button className='button' onClick={this.handleClick}>
          Click Me
        </button>
        <p className="App-intro">
          {JSON.stringify(this.state.data)}
        </p>
      </div>
    );
  }
}

export default App;

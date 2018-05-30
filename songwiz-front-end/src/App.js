import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null
    };
  }

  async componentDidMount() {
    try {
      let response = await axios.get('https://spotify-lit-node-server.herokuapp.com/api/token');
      // let response = await axios.get('http://ec2-54-213-129-218.us-west-2.compute.amazonaws.com:3001')
      console.log('RESPONSE FROM TOKEN REFRESH', response.data);
      this.setState({
        token: `Bearer ${response.data.access_token}`
      });
      console.log('STATE TOKEN', this.state.token);
    } catch(error) {
      console.log('ERROR', error);
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to SongWiz</h1>
        </header>
      </div>
    );
  }
}

export default App;

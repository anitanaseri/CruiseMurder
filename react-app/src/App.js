import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Scene from './scene';

class App extends Component {

  state ={ 
    scene : {
      text: "you're in a room",
      option: "leave the room"
    }
  }
  render() {
    return (
      <Scene sceneData={this.state.scene}/>
    );
  }
}

export default App;

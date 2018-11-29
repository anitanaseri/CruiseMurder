import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Scene from './scene';
import Option from './option';

class App extends Component {

  state ={ 
    scene : [
      "leave the room",
      "you're in a room"
    ],
    option:[
       {
        precedent: 1,
        consequent: 2,
        text: 'blah'
      },
       {
        precedent: 1,
        consequent: null,
        text: "blah 2"
      }]
    }
  


 
  render() {
    return (
      <div>
        <Scene sceneData={this.state.scene} index={1}/>
        <Option optionData={this.state.option}/>

      </div>
    );
  }
}

export default App;

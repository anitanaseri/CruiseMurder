import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Scene from './scene';
import Option from './option';

class App extends Component {

  state = {
    test: {
      SceneContent: "You just woke up on the floor of your room. You feel sick and hungover, probably shouldn't have drank that much at this age.... It's so hard to even keep your eyes open but you have a feeling that something is wrong. Don't bother trying to remember what happened last night -- you won't remember anything anyway after having that many glasses of wine. You were hanging out with Dom, things were heating up and then...",
      choices: [
        {
          Consequent: 2,
          Text: "Look around the room"
        },
        {
          Consequent: 3,
          Text: "Report the murder"
        }
      ]
    }
  }




  render() {
    return (
      <div>
        <Scene sceneData={this.state.test} />
       
      </div>
    );
  }
}

export default App;

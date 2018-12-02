import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Scene from './scene';
import Option from './option';

class App extends Component {

  state = {
    context: [{
      SceneContent: "You just woke up on the floor of your room. You feel sick and hungover, probably shouldn't have drank that much at this age.... It's so hard to even keep your eyes open but you have a feeling that something is wrong. Don't bother trying to remember what happened last night -- you won't remember anything anyway after having that many glasses of wine. You were hanging out with Dom, things were heating up and then...",
      choices: [
        {
          Consequent: 2,
          Text: "Look around the room"
        }
      ]
    }], 
    
    addScene: (newScene) => {
      let newState = this.state;
      newState.context.push({
        SceneContent: newScene.SceneContent,
        choices: newScene.Choices
      });
      this.setState(newState);
      console.log(newState);
    }
  }

  renderScenes = () => {
    console.log("aaaa");
    let scenesElements = [];
    for(let i = 0; i < this.state.context.length; i++){
      scenesElements.push(<Scene sceneData={this.state.context[i]} sceneHandler={this.state.addScene} />)
    }
    return scenesElements;
  }



  render() {
    return (
      <div className="sceneList">
        {this.renderScenes()}
       
      </div>
    );
  }
}

export default App;

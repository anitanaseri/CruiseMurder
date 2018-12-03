import React, { Component } from 'react';
import './App.css';
import Scene from './scene';

class App extends Component {
  state = {
    context: []
  } 

  async componentDidMount() {
    let newContext = this.state.context;
    fetch("http://localhost:51634/api/scenes/1")
                        .then(res => {
                          console.log(res);
                          return res.json();
                        })
                        .then(data => {
                          console.log(JSON.stringify(data));
                          newContext.push(data);
                          this.setState({context: newContext});
                        })
                        .catch(rejected => console.log(rejected));
  }  
  
  addScene= (newScene) => {
    let newState = this.state;
    newState.context.push({
      SceneContent: newScene.SceneContent,
      SceneImage: newScene.SceneImage,
      Choices: newScene.Choices
    });
    this.setState(newState);
    // console.log(newState);
  }

  hiddenButton = (i) => {
    return i !== this.state.context.length - 1;
  }

  render() {
    return (
      <div>
        <h1>Title</h1>
        {this.state.context.map((scene, i) => (
            <Scene key={i} sceneData={scene} sceneHandler={this.addScene} buttonHidden={this.hiddenButton.call(this, i)}/>
          )
        )}
      </div>
    );
  }
}

export default App;

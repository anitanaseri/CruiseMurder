import React, { Component } from 'react';
import './App.css';
import Scene from './scene';
import YouTubePlayer from 'react-player/lib/players/YouTube'

class App extends Component {
  state = {
    context: []
  } 

  async componentDidMount() {
    this.startGame();
  }  

  startGame = () => {
    let newContext = [];
    fetch("http://localhost:51634/api/scenes/1")
                        .then(res => res.json())
                        .then(data => {
                          newContext.push(data);
                          this.setState({context: newContext});
                          document.getElementsByClassName("gameHeader")[0].style = "background-color: white";
                          document.getElementsByTagName("body")[0].style = "background-color: white";
                          document.getElementsByTagName("div")[0].style = "color: black";
                        })
                        .catch(rejected => console.log(rejected));
  }
  
  addScene= (newScene) => {
    let newState = this.state;
    newState.context.push({
      SceneId: newScene.SceneId, 
      SceneContent: newScene.SceneContent,
      Choices: newScene.Choices,
      EndingType: newScene.EndingType,
      SceneImage: newScene.SceneImage
    });
    this.setState(newState);
    // console.log(newState);
  }

  hiddenButton = (i) => {
    return i !== this.state.context.length - 1;
  }

  render() {
    return (
      <div className="gameContainer">
        <div className="gameHeader">
          <h1>Title</h1>
          <button onClick={this.startGame} className="startOverButton">Start over</button>
        </div>
        {/* <YouTubePlayer
          url='https://www.youtube.com/watch?v=wsKKd8cw7s8'
          playing loop
          controls
        /> */}
        <div className="sceneList">
          {this.state.context.map((scene, i) => (
              <Scene key={i} sceneData={scene} sceneHandler={this.addScene} buttonHidden={this.hiddenButton.call(this, i)}/>
            )
          )}
        </div>
      </div>
    );
  }
}

export default App;

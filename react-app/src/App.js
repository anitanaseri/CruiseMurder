import React, { Component } from 'react';
import './App.css';
import Scene from './scene';
import YouTubePlayer from 'react-player/lib/players/YouTube'

class App extends Component {
  state = {
    context: [],
    playing: false,
    muteBtnText: " MUTE "
  } 

  async componentDidMount() {
    document.title = "Murder in the Pacific"
    this.startGame();
    setTimeout(this.setState({playing: true}), 3000);
  }  

  startGame = () => {
    let newContext = [];
    fetch("http://localhost:51634/api/scenes/1")
                        .then(res => {
                          console.log(res);
                          return res.json();
                        })
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

  makeSceneComponent = (scene, i) => {
    return (
      <Scene key={i} sceneData={scene} sceneHandler={this.addScene} buttonHidden={this.hiddenButton.call(this, i)}/>
  )}

  mostRecentScene = (context) => {
    if (context.length > 0) {
      return this.makeSceneComponent(context[context.length - 1], context.length - 1)
    }
    else {
      return;
    }
  }

  mute = () => {
    let newState;
    if(this.state.playing)
    {
      newState = {
      muteBtnText: "Unmute",
      playing: false
      };
    }
    else{
      newState = {
        muteBtnText: " MUTE ",
        playing: true
        };
    }
    this.setState(newState);
  }

  render() {
    return (
      <div className="gameContainer">
        <div className="gameHeader">
          <h1>Murder in the Pacific</h1>
          <button onClick={this.startGame} className="startOverButton">Start over</button>
          <button onClick={this.mute} className="muteButton">{this.state.muteBtnText}</button>
        </div>
        <YouTubePlayer
          id= 'music-player'
          url='https://www.youtube.com/watch?v=wsKKd8cw7s8'
          loop playing={this.state.playing}
          width="0px" height="0px"
        />
        <div className="sceneList">
          <div className="oldScenes">
            {this.state.context.slice(0,-1).map(this.makeSceneComponent)}
          </div>
          <div className="newScene">
            {this.mostRecentScene(this.state.context)}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

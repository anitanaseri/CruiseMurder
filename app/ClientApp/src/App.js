import React, { Component } from 'react';
import './App.css';
import Scene from './scene';
import YouTubePlayer from 'react-player/lib/players/YouTube';
import MapSidebar from './mapSidebar';


class App extends Component {
	constructor() {
		super();
		this.state = {
			context: [],
			playing: false,
			muteBtnText: "Mute",
			playerPosition: 'room',
			showModal: false
		}

		this.handleOpenModal = this.handleOpenModal.bind(this);
	}


	async componentDidMount() {
		document.title = "Murder in the Pacific"
		this.startGame();
		setTimeout(this.setState({ playing: true }), 3000);
	}

	startGame = () => {
		this.setState({ playerPosition: 'room' });
		let newContext = [];
		fetch("http://localhost:39147/api/scenes/1")
			.then(res => {
				return res.json();
			})
			.then(data => {
				newContext.push(data);
				this.setState({ context: newContext });
				document.getElementsByClassName("gameHeader")[0].style = "background-color: white";
				document.getElementsByTagName("body")[0].style = "background-color: white";
				document.getElementsByTagName("div")[0].style = "color: black";
			})
			.catch(rejected => console.log(rejected));
	}

	addScene = (newScene) => {
		let newContext = this.state.context;
		newContext.push({
			SceneId: newScene.SceneId,
			SceneContent: newScene.SceneContent,
			Choices: newScene.Choices,
			EndingType: newScene.EndingType,
			SceneImage: newScene.SceneImage,
			SceneLocation: newScene.SceneLocation
		});
		this.setState({context: newContext});
		this.setState({ playerPosition: newScene.SceneLocation });
	}

	hiddenButton = (i) => {
		return i !== this.state.context.length - 1;
	}

	makeSceneComponent = (scene, i) => {
		return (
      <Scene
        key={i} sceneData={scene} sceneHandler={this.addScene} buttonHidden={this.hiddenButton.call(this, i)} />
		)
	}
	handleOpenModal = () => {
		let toggle = !this.state.showModal;
		this.setState({ showModal: toggle });

	}
	mute = () => {
		let newState;
		if (this.state.playing) {
			newState = {
				muteBtnText: "Unmute",
				playing: false
			};
		}
		else {
			newState = {
				muteBtnText: "Mute",
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
          <MapSidebar 
            handleOpenModal={this.handleOpenModal} 
            playerPosition={this.state.playerPosition}
            showModal = {this.state.showModal}
          />
				</div>

				<YouTubePlayer
					id='music-player'
					url='https://www.youtube.com/watch?v=wsKKd8cw7s8'
					loop playing={this.state.playing}
					width="0px" height="0px"
				/>
				<div className="sceneList">
						{this.state.context.map(this.makeSceneComponent)}
				</div>
			</div>
		);
	}
}

export default App;

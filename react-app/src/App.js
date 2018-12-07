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
			showModal: false,
			colorblindMode: false
		}

		this.handleOpenModal = this.handleOpenModal.bind(this);
	}


	async componentDidMount() {
		document.title = "Murder in the Pacific"
		document.documentElement.lang = "en"
		this.startGame();
		setTimeout(this.setState({ playing: true }), 3000);
	}

	startGame = () => {
		this.setState({ playerPosition: 'room' });
		let newContext = [];
		fetch("http://localhost:51634/api/scenes/1")
			.then(res => {
				return res.json();
			})
			.then(data => {
				newContext.push(data);
				this.setState({ context: newContext });
				document.getElementsByClassName("gameHeader")[0].style = "background-color: var(--main-bg-color)";
				document.getElementsByTagName("body")[0].style = "background-color: var(--main-bg-color)";
				document.getElementsByTagName("div")[0].style = "color: var(--main-color)";
			})
			.catch(rejected => console.log(rejected));
	}

	addScene = (newScene) => {
		let newState = this.state;
		newState.context.push({
			SceneId: newScene.SceneId,
			SceneContent: newScene.SceneContent,
			Choices: newScene.Choices,
			EndingType: newScene.EndingType,
			SceneImage: newScene.SceneImage,
			SceneLocation: newScene.SceneLocation
		});
		this.setState(newState);
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

	toggleColorblindMode = () => {
		if (this.state.colorblindMode) {
			let newState = {
				colorblindMode: false
			}
			this.setState(newState)
			document.styleSheets[0].rules[0].style.setProperty('--main-red-color', 'red')
			document.styleSheets[0].rules[0].style.setProperty('--main-button-color', '#7a68d2')
		}
		else {
			let newState = {
				colorblindMode: true
			}
			this.setState(newState)
			document.styleSheets[0].rules[0].style.setProperty('--main-red-color', 'white')
			document.styleSheets[0].rules[0].style.setProperty('--main-button-color', 'black')
		}
	}

	render() {
		return (
			<div className="gameContainer">

				<div className="gameHeader" role="banner">
					<h1>Murder in the Pacific</h1>
					<button onClick={this.startGame} className="startOverButton">Start over</button>
					<button onClick={this.mute} className="muteButton">{this.state.muteBtnText}</button>
					<button onClick={this.toggleColorblindMode}>Colorblind Mode</button>
          <MapSidebar 
            handleOpenModal={this.handleOpenModal} 
            playerPosition={this.state.playerPosition}
            showModal = {this.state.showModal}
          />
				</div>
				<div className="musicPlayerWrapper"
					tabIndex="-1"
					aria-hidden="true"
					style={{display: "none"}}>
					<YouTubePlayer
						id='music-player'
						url='https://www.youtube.com/watch?v=wsKKd8cw7s8'
						loop playing={this.state.playing}
					/>
				</div>
				<main role="main">
					SOME TEXT.
					<div className="sceneList">
							{this.state.context.map(this.makeSceneComponent)}
					</div>
				</main>
			</div>
		);
	}
}

export default App;

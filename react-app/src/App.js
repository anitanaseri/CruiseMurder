import React, { Component } from 'react';
import './App.css';
import Scene from './scene';
import YouTubePlayer from 'react-player/lib/players/YouTube'
import Map from './map';
import ReactModal from 'react-modal';
import easterEgg from './easterEgg.PNG';

class App extends Component {
	constructor() {
		super();
		this.state = {
			context: [],
			playing: false,
			muteBtnText: " MUTE ",
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
		fetch("http://localhost:51634/api/scenes/1")
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
		// console.log(newState);
	}

	movePlayerOnMap = () => {

	}

	hiddenButton = (i) => {
		return i !== this.state.context.length - 1;
	}

	makeSceneComponent = (scene, i) => {
		return (
			<Scene key={i} sceneData={scene} sceneHandler={this.addScene} buttonHidden={this.hiddenButton.call(this, i)} />
		)
	}

	mostRecentScene = (context) => {
		if (context.length > 0) {
			return this.makeSceneComponent(context[context.length - 1], context.length - 1)
		}
		else {
			return;
		}
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
					<div className='map'  >
						<strong>Map legend</strong> <br />
						@: Player <br />
						D: Dom's room <br />
						B: Ballroom <br />
						E: Eleanor's room <br />
						e: Eleanor <br />
						<div onClick={this.handleOpenModal}>
							<ReactModal
								className="modal"
								ariaHideApp={false}
								isOpen={this.state.showModal}
								contentLabel="Minimal Modal Example"
							>
								<img className="modal" src={easterEgg} />
				 			</ReactModal>
							<Map playerPosition={this.state.playerPosition} />
						</div>
					</div>
				</div>
				<YouTubePlayer
					id='music-player'
					url='https://www.youtube.com/watch?v=wsKKd8cw7s8'
					loop playing={this.state.playing}
					width="0px" height="0px"
				/>
				<div className="sceneList">
					<div className="oldScenes">
						{this.state.context.slice(0, -1).map(this.makeSceneComponent)}
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

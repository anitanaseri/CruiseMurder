import React, { Component } from 'react';
import ReactModal from 'react-modal';
import Img from 'react-image'
import GameOver from './gameover';
import groupImage from './res/vac.jpg'

let formatString = string => {
    return string.split( "\n" ).map(function(item, index) {
         return (
             <span key={index} tabIndex="0">
             {item}
             <br/>
             </span>
         )
         })
 }

class Scene extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false
        }
    }

    componentDidMount = () => {
        window.scrollTo(0,document.body.scrollHeight);
    }

    choiceClick = (consequent, sceneHandler) => {
        // console.log("clicked button " + consequent);
        fetch("http://localhost:51634/api/scenes/" + consequent)
            .then(res => res.json())
            .then(
                (result) => {
                    sceneHandler(result);
            });
    }

    attachOptions = (Choices, sceneHandler, buttonHidden) => {
        if(buttonHidden) return <br/>;
        let choicesComponent = Choices.map((choice, i) => 
            (
                <p key={i}>
                    <button key={i} onClick={this.choiceClick.bind(this, choice.Consequent, sceneHandler)}>
                        {Choices[i].Text} 
                    </button>
                </p>
            )
        )
        
        return choicesComponent;        
    }

    createSceneImage = (sceneData) => {
        let imageToUse = sceneData.SceneImage == 'none' ? "" : sceneData.SceneImage;
        if (sceneData.SceneId == 1) {
            return (
                <pre onClick={this.handleOpenModal} aria-hidden="true">
                    <ReactModal
                        ariaHideApp={false}
                        isOpen={this.state.showModal}
                        contentLabel="Minimal Modal Example"
                    >
                        <img src={groupImage} className="modal" />
                    </ReactModal>
                    {imageToUse}
                </pre>
            )
        }
        else {
            return (
                <pre>{imageToUse}</pre>
            )
        }
    }

    handleOpenModal = () => {
		let toggle = !this.state.showModal;
		this.setState({ showModal: toggle });
	}

    render() {
        const {sceneHandler, sceneData, buttonHidden} = this.props;
        return (
         <div className="sceneBox">
            {formatString(sceneData.SceneContent)}
            {this.createSceneImage(sceneData)}
            <div className="buttonContainer">
                {this.attachOptions(sceneData.Choices, sceneHandler, buttonHidden, sceneData.EndingType)}
            </div>
            <GameOver endingType={sceneData.EndingType}/>
         </div>
        );  
    }
}

export default Scene;
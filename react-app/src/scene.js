import React, { Component } from 'react';
import ReactModal from 'react-modal';
import GameOver from './gameover';

let formatString = string => {
    return string.split( "\n" ).map(function(item, index) {
         return (
             <span key={index}>
             {item}
             <br/>
             </span>
         )
         })
 }

class Scene extends Component {
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
                <pre onClick="">{imageToUse}</pre>
            )
        }
        else {
            return (
                <pre>{imageToUse}</pre>
            )
        }
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
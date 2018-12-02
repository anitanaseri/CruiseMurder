import React, { Component } from 'react';

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
    choiceClick = (consequent, sceneHandler) => {
        console.log("clicked button " + consequent);
        fetch("http://localhost:51634/api/scenes/" + consequent)
            .then(res => res.json())
            .then(
                (result) => {
                    sceneHandler(result);
            });
    }

    attachOptions = (Choices, sceneHandler) => {
        let choicesComponent = Choices.map((choice, i) => 
            (
                <button key={i} onClick={this.choiceClick.bind(this, choice.Consequent, sceneHandler)}>
                    {Choices[i].Text}
                </button>
            )
        )
        return choicesComponent;
    }

    render() {
        const {sceneHandler, sceneData} = this.props;
        return (
         <div>
            {formatString(sceneData.SceneContent)}
            {this.attachOptions(sceneData.Choices, sceneHandler)}
         </div>
        );  
    }
}

export default Scene;
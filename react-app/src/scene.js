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

    attachOptions = (Choices, sceneHandler, buttonHidden) => {
        if(buttonHidden) return <br/>;
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
        const {sceneHandler, sceneData, buttonHidden} = this.props;
        return (
         <div>
            {formatString(sceneData.SceneContent)}
            {this.attachOptions(sceneData.Choices, sceneHandler, buttonHidden)}
         </div>
        );  
    }
}

export default Scene;
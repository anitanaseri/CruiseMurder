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
    componentDidMount = () => {
        window.scrollTo(0,document.body.scrollHeight);
    }

    choiceClick = (consequent, sceneHandler) => {
        console.log("clicked button " + consequent);
        fetch("http://localhost:51634/api/scenes/" + consequent)
            .then(res => res.json())
            .then(
                (result) => {
                    sceneHandler(result);
            });
    }

    attachOptions = (Choices, sceneHandler, buttonHidden, EndingType) => {
        if(EndingType.trim() !== 'none') console.log(EndingType);
        if(buttonHidden) return <br/>;
        let choicesComponent = Choices.map((choice, i) => 
            (
                <p>
                    <button key={i} onClick={this.choiceClick.bind(this, choice.Consequent, sceneHandler)}>
                        {Choices[i].Text} 
                    </button>
                </p>
            )
        )
        if (Choices.length === 0) {
            document.getElementsByClassName("gameHeader")[0].style = "background-color: black";
            document.getElementsByTagName("body")[0].style = "background-color: black";
            document.getElementsByTagName("div")[0].style = "color: red";
            
            return (
                <div>
                <pre className="gameOver"> 
{'  '},--,     .--.           ,---.    .---..-.   .-.,---.  ,---.    <br></br>
.' .'     / /\ \ |\    /| | .-'   / .-. )\ \ / / | .-'  | .-.\   <br></br>
|  |  __ / /__\ \|(\  / | | `-.   | | |(_)\ V /  | `-.  | `-'/   <br></br>
\  \ ( _)|  __  |(_)\/  | | .-'   | | | |  ) /   | .-'  |   (    <br></br>
{' '}\  `-) )| |  |)|| \  / | |  `--. \ `-' / (_)    |  `--.| |\ \   <br></br>
{' '})\____/ |_|  (_)| |\/| | /( __.'  )---'         /( __.'|_| \)\  <br></br>
(__)             '-'  '-'(__)     (_)           (__)        (__) <br></br>
                </pre>
                
                </div>
            );
        }
        else {
            return choicesComponent;
        }
    }

    render() {
        const {sceneHandler, sceneData, buttonHidden} = this.props;
        return (
         <div className="sceneBox">
            <p>{formatString(sceneData.SceneContent)}</p>
            <pre>{sceneData.SceneImage.trim() === 'none' ? "" : sceneData.SceneImage}</pre>
            <div className="buttonContainer">
                {this.attachOptions(sceneData.Choices, sceneHandler, buttonHidden, sceneData.EndingType)}
            </div>
         </div>
        );  
    }
}

export default Scene;
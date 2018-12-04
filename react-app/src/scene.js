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
<<<<<<< HEAD
    displayEnding = (endingType) => {
        if (endingType === 'bad') {
=======

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
>>>>>>> origin/master
            document.getElementsByClassName("gameHeader")[0].style = "background-color: black";
            document.getElementsByTagName("body")[0].style = "background-color: black";
            document.getElementsByTagName("div")[0].style = "color: red";
            console.log('bad ending');
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
        }else if(endingType === 'good'){
            return(
                <div><pre className='theEnd'>
            _______ .-. .-.,---.    ,---.  .-. .-. ,'|"\   <br/>
            |__   __||  |||| .-'    | .-'  |  \| | | |\ \  <br/>
                   {  } )| |   | `-' || `-.    | `-.  |   | | | | \ \ <br/>
                {   }   (_) |   | .-. || .-'    | .-'  | |\  | | |  \ \   <br/>
                {  }   | |   | | |)||  `--.  |  `--.| | |)| /(|`-' / <br/>
                  { }  `-'   /(  (_)/( __.'  /( __.'/(  (_)(__)`--' <br/>
                    {  }     (__)   (__)     (__)   (__)             <br/>
                </pre></div>
            )
        }
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

    render() {
        const {sceneHandler, sceneData, buttonHidden} = this.props;
        return (
         <div className="sceneBox">
<<<<<<< HEAD
            {formatString(sceneData.SceneContent)}
            <pre>{sceneData.SceneImage === 'none' ? "" : sceneData.SceneImage}</pre>
=======
            <p>{formatString(sceneData.SceneContent)}</p>
            <pre>{sceneData.SceneImage.trim() === 'none' ? "" : sceneData.SceneImage}</pre>
>>>>>>> origin/master
            <div className="buttonContainer">
                {this.attachOptions(sceneData.Choices, sceneHandler, buttonHidden)}
            </div>
            {this.displayEnding(sceneData.EndingType)}
         </div>
        );  
    }
}

export default Scene;
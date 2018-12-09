import React, { Component } from 'react';
import gameoverSound from './res/game-over-sound-effect.mp3';

class GameOver extends Component {
    componentDidMount(){
        if(this.props.endingType.trim() === "bad"){   
            this.changeTheme();
        }
    }

    changeTheme(){
        document.getElementsByClassName("gameHeader")[0].style = "background-color: var(--main-color)";
        document.getElementsByTagName("body")[0].style = "background-color: var(--main-color)";
        document.getElementsByTagName("div")[0].style = "color: var(--main-red-color)";
        document.getElementsByClassName("sceneList")[0].lastElementChild.style = "color: var(--main-red-color)";        
    }

    render() {
        const {endingType} = this.props;
        if(endingType.trim() === "bad"){            
            return(
                <div>
                    <audio ref="audio_tag" src={gameoverSound} style={{display:"none"}} controls autoPlay/>
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
        else if(endingType.trim() === 'good'){
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
            );
        }
        else return null;
    }
}

export default GameOver;
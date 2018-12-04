import React, { Component } from 'react';
import { callPlayer } from 'react-player/lib/utils';

const map = (props) =>{
    const myMap =
    [
        ["^", "|", "=", "=", "=", "=", "=", "|", "^"],
        ["^", "|", "D", "=","||", "=", "=", "|", "^"],
        ["^", "|", "=", "=","||", "=", "=", "|", "^"],
        ["^", "|", "B", "=","||", "=", "E", "|", "^"],
        ["^", "|", "=", "=","||", "=", "=", "|", "^"],
        ["^","\\", "=", "=","=", "e", "=", "/", "^"],
        ["^", "^", "_", "_","_", "_", "_", "^", "^"],
        ["^", "^", "^", "^","^", "^", "^", "^", "^"]
    ]
    const getPlayerCoordination = playerPosition =>{
        switch(playerPosition){
            case 'room': return {x: 6, y: 0};
            case 'dom': return {x: 3, y: 1};
            case 'hall': return{x: 4, y: 3};
            case 'ball': return{x: 3, y: 3};
            case 'deck': return{x: 4, y: 5};
            case 'elroom': return{x: 5, y: 3};
        }
    }
    const drawMap = () => {
        let outputString = "";
        let player = getPlayerCoordination(props.playerPosition);

        for (let y = 0; y < myMap.length; y++) {
            for (let x = 0; x < myMap[y].length; x++) {
                if (x == player.x && y == player.y) {
                    outputString += "@"
                }
                else {
                    outputString += myMap[y][x]
                }
            }
            outputString += "\n"
        }

        return outputString;
    }

    const formatString = string => {
        return string.split( "\n" ).map(function(item, index) {
             return (
                 <span key={index}>
                 {item}
                 <br/>
                 </span>
             )
             })
     }

    return (
        <p className="mapBox">{formatString(drawMap())}</p>
        
    );
    

//         <pre> // pretty map that didn't make it...
// {}                         __________<br/>
// {}                        | BALLROOM |<br/>
// {} | @|.....|DOM ROOM| ...|          |<br/>
// {}              .         |__________|<br/>
// {}              .<br/>
// {} |EL ROOM|.....<br/>
// {}              .<br/>
// {} _____________._________________<br/>
// {}\                               /<br/>
// {} \                             /<br/>
// {}  \               EL          /<br/>
// {}   (((((((((((((()))))))))))))<br/>
//         </pre>
    
}

export default map;
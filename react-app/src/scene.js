import React, { Component } from 'react';
import Option from './option';




class Scene extends Component {
    choiceClick = (consequent) => {
        console.log("clicked button " + consequent);
        fetch("http://localhost:51634/api/scenes/" + consequent)
            .then(res => res.json())
            .then(
                (result) => {
                  console.log(result);
            });
    }

    attachOptions = (choices) => {
        let res_element = [];
        let children = [];
        for(let i = 0; i < choices.length; i++){
            children.push(<button onClick={this.choiceClick.bind(this, choices[i].Consequent)}>{choices[i].Text}</button>)
        }
        res_element.push(<p>{children}</p>)
        return res_element;
    }


    render() {
        const {sceneData} = this.props;
        return (
         <div> 
            TITLE
            <br/>
            {sceneData.SceneContent}
            {this.attachOptions(sceneData.choices)}
         </div>
        );
    }
}



export default Scene;
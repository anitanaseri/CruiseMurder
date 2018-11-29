import React, { Component } from 'react';

const SceneText = props => {
    return (
       <div>{props.sceneData.text}</div> 
    );
}

class Scene extends Component {


    render() {
        const {sceneData} = this.props;
        return (
         <div> 
             TITLE
             <SceneText sceneData={sceneData}/>
         </div>
        );
    }
}

export default Scene;
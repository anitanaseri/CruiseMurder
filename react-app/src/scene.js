import React, { Component } from 'react';

// const SceneText = props => {
//     return (
//       <div>{props.scene[1]}</div>
//     );
// }




class Scene extends Component {


    render() {
        const {sceneData, index} = this.props;
        return (
         <div> 
            TITLE
            <br/>
            {sceneData[0]}
         </div>
        );
    }
}



export default Scene;
import React, { Component } from 'react';



const Options = props => { 
    return (
        <p>
            {
                props.sceneData.choices.map(choice =>
                   <button>{choice.Text}</button> 
                )
            }

        </p>
    )

}


class Scene extends Component {


    render() {
        const {sceneData} = this.props;
        return (
         <div> 
            TITLE
            <br/>
            {sceneData.SceneContent}
            <Options sceneData={sceneData}/>
         </div>
        );
    }
}



export default Scene;
import React, { Component } from 'react';



const Options = props => { 
    const choices = props.optionData.filter(option => {
        if ( option.precedent === 1){

            return (
             
                    <button>Delete</button>
            
            );
        }
    });

    return choices;
}


class Option extends Component {


    render() {
        const {optionData} = this.props;
        return (
         <div> 
             <Options optionData={optionData}/>
         </div>
        );
    }
}



export default Option;
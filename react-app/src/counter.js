import React, { Component } from 'react';


class Counter extends Component {

    state = {
        counter : 0
    }
    async componentDidMount() {
        this.getCount(this.props.sceneId);
        this.updateCount(this.props.sceneId);

    }
    
//     'Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    updateCount = (sceneId) =>{
        const requestType={
            headers: {
                "Content-Type" : "application/json"},
            //     "Access-Control-Allow-Origin": '*',
            //     "Access-Control-Allow-Methods": 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            //     "Access-Control-Allow-Headers": 'Origin, Content-Type,X-Auth-Token'
            // },
            body: JSON.stringify(sceneId),
        
            method: "POST"
        };

        fetch("http://localhost:51634/api/EndingRecord/", requestType)
            .then(res => res.json())
            .then(res => {
              console.log(res)})
            .catch(error => console.log(error));
            
    }

    getCount = (sceneId) => {
        fetch("http://localhost:51634/api/EndingRecord/" + sceneId)
            .then(res => res.json())
            .then(data => {
                this.setState({counter: data.SceneCount})
            } 
            );
    }

    render(){
        if(this.state.counter === 0){
            return(
                <div className="gameOverCounter">
                    You're the first player who made it here!
                </div>
            )
        }else{
            return(
                <div className="gameOverCounter">
                    {this.state.counter} other player(s) made it here!
                </div>
            )
        }
    }
}

export default Counter;
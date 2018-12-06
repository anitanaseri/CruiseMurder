import React from 'react';
import Map from './map';
import ReactModal from 'react-modal';
import easterEgg from './easterEgg.PNG';

const MapSidebar = props => {
    return(
        <div className='map' >
            <strong>Map legend</strong> <br />
            @: Player <br />
            D: Dom's room <br />
            B: Ballroom <br />
            E: Eleanor's room <br />
            e: Eleanor <br />
            <div onClick={props.handleOpenModal}>
                <ReactModal
                    className="modal"
                    ariaHideApp={false}
                    isOpen={props.showModal}
                    contentLabel="Minimal Modal Example"
                >
                    <img className="modal" src={easterEgg} />
                </ReactModal>
                <Map playerPosition={props.playerPosition} />
		    </div>
        </div>
    )
}

export default MapSidebar;
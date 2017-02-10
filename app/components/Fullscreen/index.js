import React from 'react';
import './index.css';

class Fullscreen extends React.Component {
    render() {
        const {
            setFullscreen
        } = this.props;

        return ( <li className='fullscreen-button controls-button'
            onClick={setFullscreen}>{'fullscreen'}</li> );
    }
}

export default Fullscreen;

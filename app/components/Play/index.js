import React from 'react';
import './index.css';

class Play extends React.Component {
    render() {
        const {
            togglePlay,
            paused
        } = this.props;

        const play = paused
        ? 'play'
        : 'pause';

        return ( <li className='play-button controls-button'
            onClick={togglePlay}>{play}</li> );
    }
}

export default Play;

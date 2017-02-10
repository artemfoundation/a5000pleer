import React from 'react';
import './index.css';

class Controls extends React.Component {
    render() {
        const {
            children
        } = this.props;

        return <ul className='video-pleer-controls'>{children}</ul>;
    }
}

export default Controls;

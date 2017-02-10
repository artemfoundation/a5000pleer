import React from 'react';
import './index.css';

class Time extends React.Component {
    constructor( props ) {
        super( props );

        this.timeFormat = this.timeFormat.bind(this);
        this.duration = this.timeFormat( _.round( this.props.duration ) );
    }

    render() {
        const {
            currentTime,
            duration
        } = this.props;

        return (
            <li className='time'>
                {this.timeFormat( _.round( currentTime ) ) + ' / ' + this.duration}
            </li> );
    }

    timeFormat( seconds ) {
        seconds = Number(seconds);
        let hours = Math.floor(seconds / 3600);
        let minutes = Math.floor(seconds % 3600 / 60);
        let seconds = Math.floor(seconds % 3600 % 60);
        return ((hours > 0 ? hours + ':' + (minutes < 10 ? '0' : '') : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds);
    }
}

export default Time;

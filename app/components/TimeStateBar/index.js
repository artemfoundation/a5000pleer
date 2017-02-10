import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';

class TimeStateBar extends React.Component {
    constructor() {
        super();

        this.onClick = this.onClick.bind(this);
    }
    render() {
        const {
            currentTime,
            duration,
            changeCurrentTime
        } = this.props;

        const aggregate = _.round( (currentTime / duration) * 100 );

        return (
            <div className='time-state-bar'
                onClick={this.onClick}>
                <span className='time-state-bar-aggregate'
                    style={{ width: aggregate + '%' }}>
                </span>
            </div> );
    }

    onClick(e) {
        const {
            duration,
            changeCurrentTime
        } = this.props;
        let a = ReactDOM.findDOMNode( this ).getBoundingClientRect().width;
        const time = ( e.nativeEvent.offsetX / a );
        changeCurrentTime( time * duration )
    }
}

export default TimeStateBar;

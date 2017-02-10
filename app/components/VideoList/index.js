import React from 'react';
import {
    setOpenOrClosePleer
} from '../../actions/ActiveVideoFromPleerActions';
import './index.css';

class VideoList extends React.Component {
    constructor() {
        super();

        this.onClick = this.onClick.bind(this)
    }

    render() {
        const {
            playList
        } = this.props;

        const list = _.map( playList, ( video ) => {
            const {
                entryId,
                name,
                poster
            } = video;
            return (
                <li className='video-poster'
                    key={entryId}>
                    <a href='#'
                        onClick={() => {
                            this.onClick( video )
                        }}>
                        <img width='244' height='136' src={'./images/' + poster}/>
                        <span>{name}</span>
                    </a>
                </li>
            )
        } );

        return <ul id='videolist'>{list}</ul>
    }

    onClick(video) {
        const {
            dispatch
        } = this.props;

        dispatch( setOpenOrClosePleer( video ) )
    }
}

export default VideoList;
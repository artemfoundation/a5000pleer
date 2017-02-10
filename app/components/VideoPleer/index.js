import React from 'react';
import Modal from '../Modal';
import './index.css';
import {
    setOpenOrClosePleer
} from '../../actions/ActiveVideoFromPleerActions';
import Controls from '../Controls';
import Play from '../Play';
import Fullscreen from '../Fullscreen';
import Time from '../Time';
import TimeStateBar from '../TimeStateBar';

class VideoPleer extends React.Component {
    constructor() {
        super();

        this.state = {
            currentTime: 0,
            duration: null,
            paused: true
        }

        this.togglePlay = this.togglePlay.bind(this);
        this.setFullscreen = this.setFullscreen.bind(this);
        this.changeCurrentTime = this.changeCurrentTime.bind(this);
        this.loadedmetadata = this.loadedmetadata.bind(this);
        this.keydown = this.keydown.bind(this);
        this.timeupdate = this.timeupdate.bind(this);
    }

    componentDidMount() {
        this.video.addEventListener('loadedmetadata', this.loadedmetadata);
        this.video.addEventListener('timeupdate', this.timeupdate );
    }

    componentWillUnmount() {
        this.video.removeEventListener('loadedmetadata', this.loadedmetadata);
        document.removeEventListener( 'keydown', this.keydown );
        this.video.removeEventListener('timeupdate', this.timeupdate );
    }

    render() {
        const {
            activeVideo,
            dispatch
        } = this.props;
        const {
            paused,
            currentTime,
            duration
        } = this.state;
        const {
            entryId,
            name,
            poster,
            src
        } = activeVideo;
        const timeStateBar = duration != null
        ? <TimeStateBar currentTime={this.state.currentTime}
            duration={this.state.duration}
            changeCurrentTime={this.changeCurrentTime}/>
        : null;
        const time = duration != null
        ? <Time currentTime={currentTime}
            duration={duration}/>
        : null;

        return (
            <div controls className='video-pleer'>
                <video poster={'./images/' + poster}
                    ref={(video) => {
                        this.video = video;
                    }}
                    onClick={this.togglePlay}>
                    <source src={'./videos/' + src} type='video/mp4'/>
                </video>
                <Controls>
                    {timeStateBar}
                    <Play paused={paused}
                        togglePlay={this.togglePlay}/>
                    {time}
                    <Fullscreen setFullscreen={this.setFullscreen}/>
                </Controls>
                <div className='video-pleer-close-wrapper'>
                    <div className='shadow-line'></div>
                    <div className='video-pleer-close-button'
                        onClick={() => {
                            dispatch( setOpenOrClosePleer(null) );
                        }}>
                        {'Back'}
                    </div>
                </div>
            </div>
        );
    }

    togglePlay() {
        if( this.state.paused ) {
            this.video.play();
            this.setState(_.assign(this.state, {
                paused: false
            }));
        } else {
            this.video.pause();
            this.setState(_.assign(this.state, {
                paused: true
            }));
        }
    }

    setFullscreen() {
        const requestFullscreen = this.video.requestFullscreen
            || this.video.msRequestFullscreen
            || this.video.mozRequestFullScreen
            || this.video.webkitRequestFullscreen;

        if( requestFullscreen ) {
            requestFullscreen.apply(this.video);
        }
    }

    changeCurrentTime(time) {
        this.video.currentTime = time;
        this.setState(_.assign( this.state, {
            currentTime: time
        } ))
    }

    loadedmetadata() {
        const duration = this.video.duration;
        this.setState(_.assign( this.state, {
            duration: duration
        } ));

        document.addEventListener( 'keydown', this.keydown );
    }

    keydown( e ) {
        e = e || window.event;
        const key = e.keyCode;
        const {
            currentTime,
            duration
        } = this.state;
        const {
            dispatch
        } = this.props;
        const floorCurrentTime = _.floor( currentTime );

        if(key == 39) {
            if( !( floorCurrentTime >= _.floor( duration ) ) ) {
                this.changeCurrentTime(currentTime + 1)
            }
        }

        if(key == 37) {
            if( currentTime > 0 ) {
                this.changeCurrentTime(currentTime - 1)
            }
        }

        if(key == 27) {
            dispatch( setOpenOrClosePleer( null ) );
        }

        if(key == 32) {
            this.togglePlay();
        }
    }

    timeupdate() {
        this.setState(_.assign( this.state, {
            currentTime: this.video.currentTime
        } ));
        if( this.video.currentTime == this.video.duration ) {
            this.setState(_.assign( this.state, {
                paused: true
            } ))
        }
    }
}

const options = {
    className: 'full-screen-modal',
    closeModal: setOpenOrClosePleer
}

export default Modal(VideoPleer, options);

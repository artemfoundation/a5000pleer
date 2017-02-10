import React from 'react';
import {
    connect
} from 'react-redux';
import VideoList from '../VideoList';
import VideoPleer from '../VideoPleer';

class App extends React.Component {
    render() {
        const {
            dispatch,
            playList,
            activeVideo
        } = this.props;

        const videoPleer = activeVideo
        ? <VideoPleer dispatch={dispatch}
            activeVideo={activeVideo}/>
        : null;

        return (
            <div>
                <VideoList dispatch={dispatch}
                    playList={playList}/>
                {videoPleer}
            </div>
        )
    }
}

const mapStateToProps = ( state ) => ({
    playList: state.playList,
    activeVideo: state.activeVideo
});

export default connect(mapStateToProps)(App);

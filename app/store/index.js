import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose
} from 'redux';
import thunk from 'redux-thunk';

import PlayListReducer from '../reducers/PlayListReducer';
import ActiveVideoFromPleerReducer from '../reducers/ActiveVideoFromPleerReducer';

const rootReducer = combineReducers({
    playList: PlayListReducer,
    activeVideo: ActiveVideoFromPleerReducer
});

const middleware = applyMiddleware(
    thunk
)

export default compose(
    middleware
)(createStore)(rootReducer);

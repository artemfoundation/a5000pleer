import {
    OPEN_OR_CLOSE_PLEER
} from '../../constants/PlayListConstants';

export default function ( state = null, action ) {
    switch ( action.type ) {
        case OPEN_OR_CLOSE_PLEER: {
            return action.video;
        }

        default: {
            return state;
        }
    }
}

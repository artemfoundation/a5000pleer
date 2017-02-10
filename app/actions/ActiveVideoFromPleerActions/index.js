import {
    OPEN_OR_CLOSE_PLEER
} from '../../constants/PlayListConstants';

export const setOpenOrClosePleer = ( video ) => ({
    type: OPEN_OR_CLOSE_PLEER,
    video
});
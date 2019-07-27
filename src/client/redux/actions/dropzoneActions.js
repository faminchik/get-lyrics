import { TURN_ON_DROPZONE, TURN_OFF_DROPZONE } from 'client/constants/ActionTypes';

export const turnOnDropzone = () => dispatch => {
    dispatch({ type: TURN_ON_DROPZONE });
};

export const turnOffDropzone = () => dispatch => {
    dispatch({ type: TURN_OFF_DROPZONE });
};

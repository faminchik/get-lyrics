import { TurnOnDropzoneAction, TurnOffDropzoneAction } from 'ts/interfaces/reducer.interfaces';
import { TURN_ON_DROPZONE, TURN_OFF_DROPZONE } from 'client/constants/ActionTypes';

export const turnOnDropzone = (): TurnOnDropzoneAction => ({
    type: TURN_ON_DROPZONE
});

export const turnOffDropzone = (): TurnOffDropzoneAction => ({
    type: TURN_OFF_DROPZONE
});

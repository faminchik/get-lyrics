import { TURN_ON_DROPZONE, TURN_OFF_DROPZONE } from 'client/constants/ActionTypes';
import { DropzoneAction } from 'ts/Reducer';

type DropzoneReducerState = {
    isTurnedOff: boolean;
};

const initialState: DropzoneReducerState = {
    isTurnedOff: false
};

export default (state = initialState, action: DropzoneAction): DropzoneReducerState => {
    const { type } = action;

    if (type === TURN_ON_DROPZONE) {
        return { isTurnedOff: false };
    }

    if (type === TURN_OFF_DROPZONE) {
        return { isTurnedOff: true };
    }

    return state;
};

import { TURN_ON_DROPZONE, TURN_OFF_DROPZONE } from 'client/constants/ActionTypes';

const initialState = {
    isTurnedOff: false
};

export default (state = initialState, action) => {
    const { type } = action;

    if (type === TURN_ON_DROPZONE) {
        return { isTurnedOff: false };
    }

    if (type === TURN_OFF_DROPZONE) {
        return { isTurnedOff: true };
    }

    return state;
};

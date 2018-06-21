import _ from 'lodash';

export const getFileNameByFullName = fullName => {
    if (_.isNil(fullName)) return null;

    const spitted = _.split(fullName, '.');
    spitted.pop();

    return _.join(spitted, '');
};

export const trimMusicFileName = musicFileName => {
    // TODO
};

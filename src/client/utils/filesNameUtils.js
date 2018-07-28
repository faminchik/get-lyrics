import _ from 'lodash';
import constants from '../constants';

export const getFileNameByFullName = fullName => {
    if (_.isNil(fullName)) return null;

    const lastIndex = _.lastIndexOf(fullName, '.');
    return _.slice(fullName, 0, lastIndex).join('');
};

export const trimMusicFileName = musicFileName => {
    while (_.indexOf(musicFileName, constants.LEFT_PARENTHESIS) !== -1) {
        if (_.indexOf(musicFileName, constants.RIGHT_PARENTHESIS) === -1) {
            return musicFileName;
        }
        musicFileName = musicFileName.removeChars(
            constants.LEFT_PARENTHESIS,
            constants.RIGHT_PARENTHESIS
        );
    }
    return _.trim(_.replace(musicFileName, ' - ', ' '), ' ');
};

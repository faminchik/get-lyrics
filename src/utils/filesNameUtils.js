import _ from 'lodash';
import constants from '../constants/constants';

export const getFileNameByFullName = fullName => {
    if (_.isNil(fullName)) return null;

    const spitted = _.split(fullName, '.');
    spitted.pop();

    return _.join(spitted, '');
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
    return musicFileName;
};

String.prototype.removeChars = function(startChar, endChar) {
    const startIndex = this.indexOf(startChar);
    if (startIndex === -1) return this;

    const endIndex = this.indexOf(endChar);
    if (endIndex === -1) return this;

    const oldString = new String(this).toString();

    const firstPart = this.slice(0, startIndex);

    return this.slice(0, startIndex) + oldString.slice(endIndex + 1);
};

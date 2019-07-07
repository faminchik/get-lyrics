import _ from 'lodash';
import { LEFT_PARENTHESIS, RIGHT_PARENTHESIS } from 'client/constants/Symbols';

export const getFileNameByFullName = fullName => {
    if (_.isNil(fullName)) return null;

    const lastIndex = _.lastIndexOf(fullName, '.');
    return _.slice(fullName, 0, lastIndex).join('');
};

export const trimMusicFileNameByParentheses = musicFileName => {
    while (
        _.indexOf(musicFileName, LEFT_PARENTHESIS) !== -1 &&
        _.indexOf(musicFileName, RIGHT_PARENTHESIS) !== -1
    ) {
        musicFileName = musicFileName.removeChars(LEFT_PARENTHESIS, RIGHT_PARENTHESIS);
    }

    return _.trim(_.replace(musicFileName, /\s-\s/g, ' '), ' ');
};

import _ from 'lodash';
import { LEFT_PARENTHESIS, RIGHT_PARENTHESIS } from 'client/constants/Symbols';

export const getFileNameByFullName = (fullName: string): string => {
    const lastIndex = _.lastIndexOf(fullName, '.');

    if (lastIndex === -1) return fullName;

    return _.slice(fullName, 0, lastIndex).join('');
};

export const trimMusicFileNameByParentheses = (musicFileName: string): string => {
    while (
        _.indexOf(musicFileName, LEFT_PARENTHESIS) !== -1 &&
        _.indexOf(musicFileName, RIGHT_PARENTHESIS) !== -1
    ) {
        musicFileName = musicFileName.removeChars(LEFT_PARENTHESIS, RIGHT_PARENTHESIS);
    }

    return _.trim(_.replace(musicFileName, /\s-\s/g, ' '), ' ');
};

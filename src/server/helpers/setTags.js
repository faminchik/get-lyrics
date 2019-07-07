import nodeID3 from 'node-id3';
import { isFileExists } from 'server/utils/fileUtils';
import { SUCCESS, ERROR } from 'shared/constants/responseStatus';

export default (filePath, { lyrics }) => {
    if (!filePath || !isFileExists(filePath)) return { status: ERROR };

    const tags = {
        unsynchronisedLyrics: {
            language: 'eng',
            text: lyrics
        }
    };

    const result = nodeID3.update(tags, filePath);
    const status = result ? SUCCESS : ERROR;
    return { status };
};

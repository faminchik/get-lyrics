import nodeID3 from 'node-id3';
import { SUCCESS, ERROR } from '../../shared/constants/responseStatus';

export default (filePath, { lyrics }) => {
    if (!filePath) return false;

    const tags = {
        unsynchronisedLyrics: {
            language: 'eng',
            text: lyrics
        }
    };

    const result = nodeID3.update(tags, filePath);
    return result ? SUCCESS : ERROR;
};

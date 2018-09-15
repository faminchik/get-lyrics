import _ from 'lodash';
import nodeID3 from 'node-id3';
import { isFileExists } from '../utils/fileUtils';
import { SUCCESS, ERROR } from '../../shared/constants/responseStatus';

export default data =>
    _.map(data, item => {
        const { path, id, ...tagsToSet } = item;

        if (!path || !isFileExists(path)) {
            return { id, status: ERROR };
        }

        const { lyrics } = tagsToSet;

        const tags = {
            unsynchronisedLyrics: {
                language: 'eng',
                text: lyrics
            }
        };

        const result = nodeID3.update(tags, path);
        const status = result ? SUCCESS : ERROR;
        return { id, status };
    });

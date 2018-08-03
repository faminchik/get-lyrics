import _ from 'lodash';
import nodeID3 from 'node-id3';
import { SUCCESS, ERROR } from '../../shared/constants/responseStatus';

export default data => {
    return _.map(data, item => {
        const { path, id, ...tagsToSet } = item;
        if (!path) {
            return { id, result: false };
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
};

import _ from 'lodash';
import nodeID3, { Tags } from 'node-id3';
import { MultipleSetTagsData, MultipleSetTagsResult } from 'ts/interfaces/nodeID3.interfaces';
import { isFileExists } from 'server/utils/files';
import rs from 'shared/constants/ResponseStatus';

export default (data: MultipleSetTagsData[]): MultipleSetTagsResult[] =>
    _.map(data, (item: MultipleSetTagsData) => {
        const { path, id, lyrics } = item;

        if (!path || !isFileExists(path)) {
            return { id, status: rs.ERROR };
        }

        const tags: Tags = {
            unsynchronisedLyrics: {
                language: 'eng',
                text: lyrics
            }
        };

        const result = nodeID3.update(tags, path);
        const status = typeof result === 'boolean' ? rs.SUCCESS : rs.ERROR;
        return { id, status };
    });

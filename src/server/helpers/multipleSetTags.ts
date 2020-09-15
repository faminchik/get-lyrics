import _ from 'lodash';
import nodeID3 from 'node-id3';
import { Tags } from 'ts/types/nodeID3.types';
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
        const status = result ? rs.SUCCESS : rs.ERROR;
        return { id, status };
    });
